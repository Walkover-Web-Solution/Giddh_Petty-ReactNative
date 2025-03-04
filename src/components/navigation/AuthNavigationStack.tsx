import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../../Screens/SignIn';
import { ScreenNames } from '../../constants/NavigationConstants';
import { HeaderOptions } from '../../constants/NavigationConstants';
import TwoFactorAuthScreen from '../../Screens/TwoFactorAuthScreen';

const Stack = createStackNavigator();

const AuthNavigationStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ScreenNames.SIGN_IN} component={SignIn} options={HeaderOptions} />
      <Stack.Screen name={ScreenNames.TWO_FACTOR_AUTH} component={TwoFactorAuthScreen} options={HeaderOptions} />
    </Stack.Navigator>
  );
};

export default AuthNavigationStack;
