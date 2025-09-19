import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationStack from './NavigationStack';

const Navigation: React.FC = () => {

  return (
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
  );
};

export default Navigation;
