import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator, DeviceEventEmitter, RefreshControl, Animated } from 'react-native';
import { activeOpacity, fonts, fontSize, theme } from '../theme/theme';
import RenderChart from './renderChartComponent';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchExpensesSuccess, resetExpenses, setSelectedExpense } from '../redux/expense/ExpenseSlice';
import PlusSVG from '../../assets/images/plus.svg';
import MyBottomSheetModal from '../components/modalSheet/ModalSheet';
import { capitalizeFirstLetter } from '../utils/capitalise';
import Feather from '@react-native-vector-icons/feather';
import DateScreen from './DateScreen';
import RenderListItem from '../components/Home/renderListComponent';
import RenderButtonList from '../components/Home/renderButtonList';
import EmptySVG from '../../assets/images/empty_list.svg';
import AddTransactionModal from '../components/Home/AddTransactionModal';
import { ScreenNames } from '../constants/NavigationConstants';
import { ProgressBar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import CustomStatusBar from '../components/Header/CustomStatusBar';

const list = [
  { label: 'AllRequests', color: theme.colors.black, name: 'All Requests' },
  { label: 'Approved', color: theme.colors.secondary, name: 'Approved' },
  { label: 'Pending', color: theme.colors.purple, name: 'Pending' },
  { label: 'Rejected', color: theme.colors.gray, name: 'Rejected' },
];

const modalStyle = {
  backgroundColor : 'transparent',
  detached : true
}
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
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const Max_Header_Height = 0;
  const Min_Header_Height = -250;
  const Scroll_Distance = Max_Header_Height - Min_Header_Height
  const animatedHeaderHeight =  scrollOffsetY.interpolate({
      inputRange: [0, Scroll_Distance],
      outputRange: [Max_Header_Height , Min_Header_Height],
      extrapolate: 'clamp'
  })
  const [selectedDateRange, setSelectedDateRange] = useState({});
  useEffect(() => {
    DeviceEventEmitter.addListener('successResponse',()=>{
      setPage(1);
      setLoading(true);
      setIsListEnd(false);
      dispatch({ type: 'expenses/fetchExpensesRequest', payload: { uniqueName: selectedCompany?.uniqueName, page: 1 , setLoading: setLoading, setIsListEnd: setIsListEnd,startDate:startDate,endDate:endDate }})
    })
    setLoading(true);
    setPage(1);
    dispatch(fetchExpensesSuccess({
      "Pending": [],
      "Approved": [],
      "AllRequests": [],
      "Rejected": []
    }))
    dispatch({ type: 'expenses/fetchExpensesRequest', payload: { uniqueName: selectedCompany?.uniqueName, page: page, setLoading: setLoading, setIsListEnd: setIsListEnd,startDate:startDate,endDate:endDate } });
    return () => DeviceEventEmitter.removeAllListeners('successResponse');
  }, []);

  useEffect(() => {
    setLoading(true);
    dispatch({ type: 'expenses/fetchExpensesRequest', payload: { uniqueName: selectedCompany?.uniqueName, page: page, setLoading: setLoading, setIsListEnd: setIsListEnd,startDate:startDate,endDate:endDate } });
  }, [page]);

  useEffect(()=>{
    if(refreshing){
      setPage(1);
      setIsListEnd(false);
      dispatch({ type: 'expenses/fetchExpensesRequest', payload: { uniqueName: selectedCompany?.uniqueName, page: 1, setLoading: setLoading, setIsListEnd: setIsListEnd, startDate: startDate, endDate: endDate } });
    }
  },[refreshing])

  useEffect(() => {
    setPage(1);
    setIsListEnd(false);
    setLoading(true);
    dispatch({ type: 'expenses/fetchExpensesRequest', payload: { uniqueName: selectedCompany?.uniqueName, page: page, setLoading: setLoading, setIsListEnd: setIsListEnd,startDate:startDate,endDate:endDate } });
  }, [startDate,endDate]);

  const onPress = useCallback((item) => {
    dispatch(setSelectedExpense(item));
    navigation.navigate(ScreenNames.TRANSACTION_DETAILS,{ selectedCompany : selectedCompany });
  }, []);

  const renderFooter = () => {
    return (
      <View style={[styles.footer, {marginBottom: headerHeight.bottom}]}>
        {loading ? (
          <ActivityIndicator color="black" style={styles.activityIndicator} />
        ) : null}
      </View>
    );
  };
  const headerHeight = useSafeAreaInsets();

  const renderComponent = ({ item }) => {
    return (
      <RenderListItem key={item?.uniqueName} item={item} onPress={onPress} uniqueName={selectedCompany?.uniqueName}/>
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
    <View style={styles.subContainer}>
      <CustomStatusBar backgroundColor={theme.colors.black}/>
      <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.userContainer}>
          <TouchableOpacity activeOpacity={activeOpacity.regular} onPress={() => navigation.openDrawer()}>
            <Image source={user?.photo ? { uri: user?.photo } : require('../../assets/images/user-picture.png')} style={styles.userImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.companyBranch}>
          <Text numberOfLines={1} style={styles.companyName}>{capitalizeFirstLetter(selectedCompany?.name)}</Text>
          {selectedBranch && <View style={styles.branchContainer}><Feather name="git-merge" size={18} color={theme.colors.gray1} /><Text style={styles.branchName}>{capitalizeFirstLetter(selectedBranch?.alias)}</Text></View>}
        </View>
      </View>
      <View>
        {loading && <ProgressBar indeterminate visible={true} color={theme.colors.primary} />}
      </View>
      </View>
      <FlatList
        data={expense?.[selectedButton]}
        keyExtractor={(item) => item?.uniqueName?.toString()}
        renderItem={renderComponent}
        style={{backgroundColor:theme.colors.white}}
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={!refreshing && !loading ? <View style={styles.emptyListContainer}><EmptySVG /><Text style={styles.emptyListText}>No Data ..</Text></View> : null}
        ListFooterComponent={!refreshing ? renderFooter : null}
        onEndReached={() => { if (!isListEnd && !loading) setPage(page + 1); }}
        onEndReachedThreshold={0.5}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY}}}],
          {useNativeDriver: false}
        )}
        refreshControl={
        <RefreshControl progressViewOffset={340} refreshing={refreshing} onRefresh={()=>{
          dispatch(resetExpenses())
          setRefreshing(true);
          setPage(1);
          setIsListEnd(false);
          setTimeout(() => {
            setRefreshing(false)
          }, 500);
        }}/>
      }
      />
      <TouchableOpacity activeOpacity={activeOpacity.regular} onPress={() => bottomSheetModalExpenseRef?.current.present()} style={styles.addButton}>
        <PlusSVG color={theme.colors.white} />
      </TouchableOpacity>
      <MyBottomSheetModal
        bottomSheetModalRef={bottomSheetModalRef}
        children={<DateScreen 
          setStartDate={setStartDate} 
          setEndDate={setEndDate} 
          bottomSheetModalRef={bottomSheetModalRef} 
          selectedDateRange={selectedDateRange} 
          setSelectedDateRange={setSelectedDateRange}
          prevStartDate={startDate}
          prevEndDate={endDate}
          />}
      />
      <MyBottomSheetModal
        bottomSheetModalRef={bottomSheetModalExpenseRef}
        children={<AddTransactionModal bottomSheetModalRef={bottomSheetModalExpenseRef} navigation={navigation} dispatch={dispatch} />}
        drag={false}
      />
      <Animated.View style={[styles.animationView,{top : (65+headerHeight.top), transform: [{translateY : animatedHeaderHeight}]}]}>
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
          <TouchableOpacity
              activeOpacity={0.7}
              style={styles.dateContainer}
              onPress={handleFilterPress}>
              <Feather name="calendar" size={18} color={'#808080'} />
              <Text style={styles.dateText}>
                {moment(startDate, 'DD-MM-YYYY').format('DD MMM YY') +
                  ' - ' +
                  moment(endDate, 'DD-MM-YYYY').format('DD MMM YY')}
              </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
  subContainer: {
    backgroundColor:'white',
    flex:1
  },
  headerContainer :{
    height:70,
    zIndex:1,
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
    zIndex:3
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
    fontSize: fontSize.large.size,
    fontFamily: fonts.bold,
    color: theme.colors.white
  },
  branchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  branchName: {
    fontSize: fontSize.small.size,
    color: theme.colors.gray1,
    fontFamily: fonts.regular,
    marginLeft: 5,
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
    paddingBottom:7,
    backgroundColor: theme.colors.white,
  },
  transactionHeading: {
    fontSize: fontSize.large.size,
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
    paddingTop:363,
    paddingBottom: 0,
  },
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: fontSize.xLarge.size,
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
  companyBranch:{
    flexDirection:'column',
    padding:2
  },
  animationView :{
    flexDirection:'column',
    flex:1,
    position:'absolute',
    left:0,
    height:363,
    backgroundColor:theme.colors.white
  },
  dateContainer: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: theme.colors.gray1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  dateText : { 
    fontFamily: fonts.medium,
    fontSize: fontSize.small.size,
    marginLeft: 5 
  },
  dateBoldText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.regular.size
  }
});

export default Home;
