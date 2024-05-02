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
import {View,Text, StatusBar, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import { fontSize, fonts, theme } from './src/theme/theme';

const toastConfig = {
  tomatoToast: ({ text1 }) => (
      <Text style={styles.text}>{text1}</Text>
  )
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    Platform.OS === 'android' ? StatusBar.setBackgroundColor(theme.colors.black):null;
    StatusBar.setBarStyle('light-content');
    GoogleSignin.configure({
      webClientId: environment.google_client_id,
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={styles.container}>
          <BottomSheetModalProvider>
              <Navigation />
          </BottomSheetModalProvider>
          <Toast config={toastConfig} />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

const styles  = StyleSheet.create({
  text : {
    color:'black',
    fontFamily:fonts.medium,
    fontSize:fontSize.regular.size,
    lineHeight:fontSize.regular.lineHeight,
    marginBottom:40
  },
  container : {
    flex:1
  }
})
export default App;
