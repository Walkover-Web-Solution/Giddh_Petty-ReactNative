import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, BackHandler, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import  Header  from '../components/Header/Header';
import { resetBranch } from '../redux/company/BranchSlice';
import { setSelectedCompany } from '../redux/company/CompanySlice';
import { resetExpenses } from '../redux/expense/ExpenseSlice';
import { activeOpacity, fontSize, fonts, lineHeight, theme } from '../theme/theme';

const Company: React.FC<{ navigation: any }> = React.memo(({ navigation }) => {
  const dispatch = useDispatch();
  const selectedCompany = useSelector((state: any) => state?.company?.selectedCompany);
  const companies = useSelector((state: any) => state?.company?.companies);
  const user = useSelector((state: any) => state?.auth?.user);
  const userSession = useSelector((state:any)=>state?.auth?.user?.session?.id)
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
    <>
      <StatusBar backgroundColor={theme.colors.black} />
      <Header title={"Select a Company"} />
      <View style={styles.container}>
        <FlatList
          data={companies}
          keyExtractor={(item) => item.name}
          renderItem={renderCompanyItem}
        />
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1
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
});

export default Company;
