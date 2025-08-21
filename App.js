import React, { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './src/navigation/Navigation';
import SplashScreen from 'react-native-splash-screen';
import { environment } from './src/environments/environment.prod';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import { persistor, store } from './src/redux/index';
import Toast,{BaseToast} from 'react-native-toast-message';
import {Text, StyleSheet, View} from 'react-native';
import { fontSize, fonts, theme } from './src/theme/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SystemBars } from "react-native-edge-to-edge"
import { KeyboardAvoidingView, KeyboardProvider } from 'react-native-keyboard-controller';

const toastConfig = {
  tomatoToast: ({ text1 }) => (
      <Text style={styles.text}>{text1}</Text>
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
        <SafeAreaProvider>
          <KeyboardProvider>
            <KeyboardAvoidingView style={{flex:1}} behavior={"padding"}>
              <GestureHandlerRootView style={styles.container}>
                <BottomSheetModalProvider>
                  <SystemBars style="light"/>
                  <Navigation />
                </BottomSheetModalProvider>
                <Toast config={toastConfig} />
              </GestureHandlerRootView>
            </KeyboardAvoidingView>
          </KeyboardProvider>
        </SafeAreaProvider>
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
