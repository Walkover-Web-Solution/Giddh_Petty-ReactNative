import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, FlatList, StatusBar, ActivityIndicator, DeviceEventEmitter, RefreshControl } from 'react-native';
import { fonts, fontSizes, theme } from '../theme/theme';
import RenderChart from './renderLegendComponent';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setSelectedExpense } from '../redux/expense/ExpenseSlice';
import PlusSVG from '../../assets/images/plus.svg';
import MyBottomSheetModal from '../components/modalSheet/ModalSheet';
import { capitalizeFirstLetter } from '../utils/capitalise';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/Feather';
import DateScreen from './DateScreen';
import RenderListItem from '../components/Home/renderListComponent';
import RenderButtonList from '../components/Home/renderButtonList';
import EmptySVG from '../../assets/images/empty_list.svg';
import AddTransactionModal from '../components/Home/AddTransactionModal';
import { ScreenNames } from '../constants/NavigationConstants';

const list = [
  { label: 'AllRequests', color: theme.colors.black, name: 'All Requests' },
  { label: 'Approved', color: theme.colors.secondary, name: 'Approved' },
  { label: 'Pending', color: theme.colors.purple, name: 'Pending' },
  { label: 'Rejected', color: theme.colors.gray, name: 'Rejected' },
];

const Home = () => {
  const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // January is 0!
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
  };
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(state => state?.auth);
  const selectedCompany = useSelector(state => state?.company?.selectedCompany);
  const expense = useSelector(state => state?.expenses?.expenses);
  const selectedBranch = useSelector(state => state?.branch?.selectedBranch);
  const [selectedButton, setSelectedButton] = useState('AllRequests');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalExpenseRef = useRef(null);
  const today = new Date();
  const [endDate, setEndDate] = useState(formatDate(today));
  const [startDate, setStartDate] = useState(() => {
    const monthAgo = new Date(today.getFullYear(), today.getMonth(), 1);
    return formatDate(monthAgo);
  });
  const [refreshing, setRefreshing]=useState(false);
  // console.log(startDate);
  useEffect(() => {
    DeviceEventEmitter.addListener('successResponse',()=>{
      setPage(1);
      setLoading(true);
      setIsListEnd(false);
      dispatch({ type: 'expenses/fetchExpensesRequest', payload: { uniqueName: selectedCompany?.uniqueName, page: 1 , setLoading: setLoading, setIsListEnd: setIsListEnd,startDate:startDate,endDate:endDate, setRefreshing:setRefreshing, setPage:setPage }})
    })
    setLoading(true);
    setPage(1);
    dispatch({ type: 'expenses/fetchExpensesRequest', payload: { uniqueName: selectedCompany?.uniqueName, page: page, setLoading: setLoading, setIsListEnd: setIsListEnd,startDate:startDate,endDate:endDate, setRefreshing:setRefreshing } });
    return () => DeviceEventEmitter.removeAllListeners('successResponse');
  }, []);

  useEffect(() => {
    setLoading(true);
    dispatch({ type: 'expenses/fetchExpensesRequest', payload: { uniqueName: selectedCompany?.uniqueName, page: page, setLoading: setLoading, setIsListEnd: setIsListEnd,startDate:startDate,endDate:endDate, setRefreshing:setRefreshing } });
  }, [page]);

  useEffect(() => {
    setPage(1);
    setIsListEnd(false);
    setLoading(true);
    dispatch({ type: 'expenses/fetchExpensesRequest', payload: { uniqueName: selectedCompany?.uniqueName, page: page, setLoading: setLoading, setIsListEnd: setIsListEnd,startDate:startDate,endDate:endDate, setRefreshing:setRefreshing } });
  }, [startDate]);

  const onPress = useCallback((item) => {
    dispatch(setSelectedExpense(item));
    navigation.navigate(ScreenNames.TRANSACTION_DETAILS);
  }, []);

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator color="black" style={styles.activityIndicator} />
        ) : null}
      </View>
    );
  };

  const renderComponent = ({ item }) => {
    return (
      <RenderListItem key={item?.uniqueName} item={item} onPress={onPress} />
    );
  };

  const handleFilterPress = () => {
    bottomSheetModalRef.current?.present();
  };


  const handleButtonPress = useCallback((label) => {
    setSelectedButton(label);
  }, []);

  const renderFilterButtons = ({ item }) => {
    return <RenderButtonList item={item} handleButtonPress={handleButtonPress} selectedButton={selectedButton === item?.label} />;
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.colors.black} />
      <View style={styles.header}>
        <View style={styles.userContainer}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={user?.photo ? { uri: user?.photo } : require('../../assets/images/user-picture.png')} style={styles.userImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.companyBranch}>
          <Text style={styles.companyName}>{capitalizeFirstLetter(selectedCompany?.name)}</Text>
          {selectedBranch && <View style={styles.branchContainer}><MaterialIcons name="git-merge" size={18} color={theme.colors.gray1} /><Text style={styles.branchName}>{capitalizeFirstLetter(selectedBranch?.alias)}</Text></View>}
        </View>
      </View>

      <RenderChart />

      <View style={styles.buttonScroll}>
        <FlatList
          horizontal
          data={list}
          renderItem={renderFilterButtons}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.buttonContainer}
        />
      </View>

      <View style={styles.transactionContainer}>
        <Text style={styles.transactionHeading}>Transaction History</Text>
        <TouchableOpacity onPress={handleFilterPress}>
          <Feather name="filter" size={25} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>

      <SafeAreaView style={styles.safeAreaContainer}>
        <FlatList
          data={expense[selectedButton]}
          keyExtractor={(item) => item?.uniqueName?.toString()}
          renderItem={renderComponent}
          contentContainerStyle={styles.flatListContent}
          ListEmptyComponent={<View style={styles.emptyListContainer}><EmptySVG /><Text style={styles.emptyListText}>Data Not Found..</Text></View>}
          ListFooterComponent={renderFooter}
          onEndReached={() => { if (!isListEnd && !loading) setPage(page + 1); }}
          onEndReachedThreshold={0.5}
          refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={()=>{
            dispatch({ type: 'expenses/fetchExpensesRequest', payload: { uniqueName: selectedCompany?.uniqueName, page: 1, setLoading: setLoading, setIsListEnd: setIsListEnd,startDate:startDate,endDate:endDate, setRefreshing:setRefreshing, refreshing:true, setPage:setPage } })
          }}/>
        }
        />
        <TouchableOpacity onPress={() => bottomSheetModalExpenseRef?.current.present()} style={styles.addButton}>
          <PlusSVG color={theme.colors.white} />
        </TouchableOpacity>
        <MyBottomSheetModal
          bottomSheetModalRef={bottomSheetModalRef}
          children={<DateScreen setStartDate={setStartDate} setEndDate={setEndDate} bottomSheetModalRef={bottomSheetModalRef}/>}
          intialSnap='50%'
        />
        <MyBottomSheetModal
          bottomSheetModalRef={bottomSheetModalExpenseRef}
          children={<AddTransactionModal bottomSheetModalRef={bottomSheetModalExpenseRef} navigation={navigation} dispatch={dispatch} />}
          intialSnap='25%'
          snapArr={['25%']}
          drag={false}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 7,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: theme.colors.black,
    elevation: 10,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  userContainer: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  userImage: {
    marginLeft: 5,
    marginRight: 5,
    width: 43,
    height: 43,
    borderRadius: 40,
    backgroundColor: theme.colors.white,
    borderWidth: 1.2,
    borderColor: theme.colors.white,
  },
  companyName: {
    fontSize: fontSizes.large,
    fontFamily: fonts.bold,
    color: theme.colors.white,
  },
  branchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
  },
  branchName: {
    fontSize: fontSizes.small,
    color: theme.colors.gray1,
    paddingBottom: 5,
    fontFamily: fonts.regular,
    paddingLeft: 3,
    marginTop:3,
  },
  heading: {
    fontSize: fontSizes.extraLarge,
    fontFamily: fonts.regular,
    marginLeft: 10,
  },
  buttonScroll: {
    backgroundColor: theme.colors.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: theme.colors.white,
  },
  transactionHeading: {
    fontSize: fontSizes.large,
    fontFamily: fonts.bold,
    backgroundColor: theme.colors.white,
  },
  filterIcon: {
    paddingHorizontal: 15,
    color: 'black',
  },
  safeAreaContainer: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 0,
  },
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: fontSizes.extraLarge,
    fontFamily: fonts.medium,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  activityIndicator: {
    margin: 15,
  },
  addButton: {
    position: 'absolute',
    bottom: '7%',
    right: '50%',
    transform: [{ translateX: 30 }, { translateY: 30 }],
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    marginBottom: 20,
  },
});

export default Home;
