import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Company from '../../Screens/Company';
import { MyDrawer } from '../../Screens/Drawer';
import Branch from '../../Screens/Branch';
import NewExpenseClaimScreen from '../../Screens/NewExpense';
import AddExpenseScreen from '../../Screens/AddExpense';
import TransactionDetails from '../../Screens/TransactionDetails';
import { useSelector } from 'react-redux';
import { HeaderOptions, ScreenNames } from '../../constants/NavigationConstants';
import EditExpenseScreen from '../../Screens/EditExpenseScreen';

const Stack = createStackNavigator();

const MainNavigationStack: React.FC = () => {
  const selectedCompany = useSelector((state: any) => state?.company?.selectedCompany); 

  return (
    <Stack.Navigator>
      {selectedCompany ? (
        <>
          <Stack.Screen name={ScreenNames.DRAWER} component={MyDrawer} options={HeaderOptions} />
          <Stack.Screen name={ScreenNames.COMPANY} component={Company} options={HeaderOptions} />
        </>
      ) : (
        <>
          <Stack.Screen name={ScreenNames.COMPANY} component={Company} options={HeaderOptions} />
          <Stack.Screen name={ScreenNames.DRAWER} component={MyDrawer} options={HeaderOptions} />
        </>
      )}
      <Stack.Screen name={ScreenNames.TRANSACTION_DETAILS} component={TransactionDetails} options={HeaderOptions} />
      <Stack.Screen name={ScreenNames.EDIT_EXPENSE} component={EditExpenseScreen} options={HeaderOptions} />
      <Stack.Screen name={ScreenNames.BRANCH} component={Branch} options={HeaderOptions} />
      <Stack.Screen name={ScreenNames.NEW_EXPENSE} component={NewExpenseClaimScreen} options={HeaderOptions} />
      <Stack.Screen name={ScreenNames.ADD_EXPENSE} component={AddExpenseScreen} options={HeaderOptions} />
    </Stack.Navigator>
  );
};

export default MainNavigationStack;
