import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, BackHandler, StatusBar, SafeAreaView, RefreshControl, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import  Header  from '../components/Header/Header';
import { resetBranch } from '../redux/company/BranchSlice';
import { setSelectedCompany } from '../redux/company/CompanySlice';
import { resetExpenses } from '../redux/expense/ExpenseSlice';
import { activeOpacity, fontSize, fonts, lineHeight, theme } from '../theme/theme';

const {height,width} = Dimensions.get('window');
const Company: React.FC<{ navigation: any }> = React.memo(({ navigation }) => {
  const dispatch = useDispatch();
  const selectedCompany = useSelector((state: any) => state?.company?.selectedCompany);
  const companies = useSelector((state: any) => state?.company?.companies);
  const user = useSelector((state: any) => state?.auth?.user);
  const userSession = useSelector((state:any)=>state?.auth?.user?.session?.id)
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    if(companies.length == 0 && selectedCompany == null)
      dispatch({ type: 'company/FETCH_COMPANY_LIST', payload: { uniqueName: user?.user?.uniqueName, sessionToken: user?.session?.id } });
  }, []);

  // useEffect(() => {
  //   const backAction = () => {
  //     if (navigation.canGoBack()) {
  //       navigation.goBack();
  //     } else {
  //       BackHandler.exitApp();
  //     }
  //     return true;
  //   };
  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  //   return () => backHandler.remove();
  // }, [navigation]);

  const renderCompanyItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.companyItem}
      activeOpacity={activeOpacity.regular}
      onPress={() => {
        dispatch(resetBranch());
        dispatch(resetExpenses());
        dispatch(setSelectedCompany(item));
        dispatch({ type: 'payment/FETCH_Payment_LIST', payload: { uniqueName: item?.uniqueName } });
        if (item?.branchCount > 1){
          dispatch({ type: 'branch/FETCH_BRANCH_LIST', payload: { uniqueName: item?.uniqueName } });
          navigation.push('Branch');
        }
        else navigation.replace('Drawer');
      }}
    >
      <Text style={[styles.companyName, { color: selectedCompany?.name === item?.name ? theme.colors.secondary : theme.colors.black }]}>{item.name}</Text>
      {selectedCompany?.name === item?.name && <Text style={styles.tickIcon}>&#10004;</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
      <StatusBar backgroundColor={theme.colors.black} />
      <Header title={"Select a Company"} />
      <View style={styles.listView}>
        <FlatList
          data={companies}
          keyExtractor={(item) => item.name}
          renderItem={renderCompanyItem}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={()=>{
              dispatch({ type: 'company/FETCH_COMPANY_LIST', payload: { uniqueName: user?.user?.uniqueName, sessionToken: user?.session?.id } });
            }} />
          }
          ListEmptyComponent={()=>{
            return (
              <View style={styles.modalCancelView}>
              <Text
                  style={styles.modalCancelText}>
                  No Company Available
              </Text>
              </View>
            );
          }}
        />
      </View>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:theme.colors.black
  },
  subContainer: {
    flex:1,
    backgroundColor:theme.colors.LightGray
  },
  listView:{
    flex:1
  },
  companyItem: {
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingLeft: 40,
  },
  companyName: {
    fontSize: fontSize.regular.size,
    fontFamily: fonts.regular,
    textDecorationLine: 'none',
    lineHeight: fontSize.regular.lineHeight
  },
  tickIcon: {
    fontSize: fontSize.large.size,
    color: theme.colors.secondary,
    paddingRight: 40,
    fontFamily: fonts.regular,
    lineHeight: fontSize.large.lineHeight
  },
  modalCancelView :{
    height: height * 0.3, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 8
  },
  modalCancelText :{
      flex: 1,
      color: '#1C1C1C',
      paddingVertical: 4,
      fontFamily: fonts.regular,
      fontSize: 14,
      textAlign: 'center',
      alignSelf: 'center'
  }
});

export default Company;
