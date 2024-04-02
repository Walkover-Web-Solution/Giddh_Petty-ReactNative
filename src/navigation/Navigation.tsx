import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationStack from './NavigationStack';
import ChatWidget from '@msg91comm/react-native-hello-sdk';
import { theme } from '../theme/theme';
import { useSelector } from 'react-redux';

interface User {
  name: string;
  uniqueName: string;
}

interface HelloConfig {
  widgetToken: string;
  name: string;
  mail: string;
}

const Navigation: React.FC = () => {
  const [helloConfig, setHelloConfig] = useState<HelloConfig>({
    widgetToken: "",
    name: "",
    mail: ""
  });
  const user = useSelector((state: { auth: { user: { user: User } } }) => state?.auth?.user?.user);

  useEffect(() => {
    if (user) {
      setHelloConfig({
        widgetToken: "88461",
        name: user.name || '',
        mail: user.uniqueName || ''
      });
    }
  }, [user]);

  return (
    <NavigationContainer>
      <NavigationStack />
      <ChatWidget
        preLoaded={true}
        widgetColor={theme.colors.black}
        helloConfig={helloConfig}
      />
    </NavigationContainer>
  );
};

export default Navigation;
