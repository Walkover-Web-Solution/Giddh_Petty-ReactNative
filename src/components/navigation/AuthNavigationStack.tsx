import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../../Screens/SignIn';
import { ScreenNames } from '../../constants/NavigationConstants';
import { HeaderOptions } from '../../constants/NavigationConstants';

const Stack = createStackNavigator();

const AuthNavigationStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ScreenNames.SIGN_IN} component={SignIn} options={HeaderOptions} />
    </Stack.Navigator>
  );
};

export default AuthNavigationStack;
