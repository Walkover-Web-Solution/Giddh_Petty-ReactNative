import React, { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './src/navigation/Navigation';
import SplashScreen from 'react-native-splash-screen';
import { environment } from './src/environments/environment.prod';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import { store,persistor } from './src/redux/index';
import Toast,{BaseToast} from 'react-native-toast-message';
import {View,Text} from 'react-native';
import { fonts } from './src/theme/theme';

const toastConfig = {
  tomatoToast: ({ text1 }) => (
      <Text style={{color:'black',fontFamily:fonts.medium,fontSize:14,marginBottom:40}}>{text1}</Text>
  )
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    GoogleSignin.configure({
      webClientId: environment.google_client_id,
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
              <Navigation />
          </BottomSheetModalProvider>
          <Toast config={toastConfig} />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;
