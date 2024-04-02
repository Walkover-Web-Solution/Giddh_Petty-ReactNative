import React from 'react';
import { useSelector } from 'react-redux';
import AuthNavigationStack from '../components/navigation/AuthNavigationStack';
import MainNavigationStack from '../components/navigation/MainNavigationStack';

interface RootState {
  auth: {
    user: any; 
  };
}

const NavigationStack: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return user ? <MainNavigationStack /> : <AuthNavigationStack />;
};

export default NavigationStack;
