import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, BackHandler, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import  Header  from '../components/Header/Header';
import { resetBranch } from '../redux/company/BranchSlice';
import { setSelectedCompany } from '../redux/company/CompanySlice';
import { resetExpenses } from '../redux/expense/ExpenseSlice';
import { fonts, theme } from '../theme/theme';

const Company: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useDispatch();
  const selectedCompany = useSelector((state: any) => state?.company?.selectedCompany);
  const companies = useSelector((state: any) => state?.company?.companies);
  const user = useSelector((state: any) => state?.auth?.user);

  useEffect(() => {
    dispatch({ type: 'company/FETCH_COMPANY_LIST', payload: { uniqueName: user?.user?.uniqueName, sessionToken: user?.session?.id } });
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        BackHandler.exitApp();
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);

  const renderCompanyItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.companyItem}
      onPress={() => {
        dispatch(resetBranch());
        dispatch(resetExpenses());
        dispatch(setSelectedCompany(item));
        if (item?.branchCount > 1)
          dispatch({ type: 'branch/FETCH_BRANCH_LIST', payload: { uniqueName: item?.uniqueName } });
        dispatch({ type: 'payment/FETCH_Payment_LIST', payload: { uniqueName: item?.uniqueName } });
        if (item?.branchCount > 1)
          navigation.push('Branch');
        else navigation.push('Drawer');
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
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
    fontSize: 14,
    fontFamily: fonts.regular,
    textDecorationLine: 'none',
  },
  tickIcon: {
    fontSize: 17,
    color: theme.colors.secondary,
    paddingRight: 40,
    fontFamily: fonts.regular,
  },
});

export default Company;
