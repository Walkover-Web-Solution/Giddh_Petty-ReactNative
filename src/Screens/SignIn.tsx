import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { fonts, fontSizes, theme } from '../theme/theme';
import Header from '../components/SignIn/Header';
import GidhhSvg from '../../assets/images/giddh_icon.svg';
import SVGMsg from '../../assets/images/msg.svg';
import GoogleIcon from '../../assets/images/icons8-google-20.svg';
import { OTPVerification } from '@msg91comm/react-native-sendotp';
import { environment } from '../environments/environment.prod';

interface SignInData {
  message: string;
}

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [data, setData] = useState<SignInData | null>(null);

  const handleOtpSignIn = () => {
    setModalVisible(true);
  };

  const handleSignIn = () => {
    dispatch({ type: 'SIGN_IN' });
  };

  useEffect(() => {
    dispatch({ type: 'SIGN_IN_OTP', payload: data?.message });
  }, [data, dispatch]);

  const handleOtpCompletion = async (data: string) => {
    const response: SignInData = JSON.parse(data);
    setData(response);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={theme.colors.black} />
      <View style={styles.logoContainer}>
        <GidhhSvg />
      </View>
      <View style={styles.contentContainer}>
        <Header />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.socialLoginButton} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Login with Google</Text>
            <GoogleIcon width={23} height={23} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialLoginButton} onPress={handleOtpSignIn}>
            <Text style={styles.buttonText}>Login with OTP</Text>
            <SVGMsg width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={isModalVisible}>
        <OTPVerification
          onVisible={isModalVisible}
          onCompletion={handleOtpCompletion}
          widgetId={environment.widgetId}
          authToken={environment.authToken}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
  logoContainer: {
    paddingTop: '20%',
    paddingBottom: '25%',
    backgroundColor: theme.colors.black,
    width: '100%',
    height: '62%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    borderTopRightRadius: 50,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 50,
  },
  buttonContainer: {
    flex: 1,
    marginBottom: 60,
    marginTop: 25,
  },
  socialLoginButton: {
    flexDirection: 'row',
    backgroundColor: theme.colors.black,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 50,
    width: '77%',
    paddingVertical: 13,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  buttonText: {
    paddingLeft: 5,
    color: 'white',
    fontFamily: fonts.medium,
    fontSize: fontSizes.large,
    lineHeight: 19,
  },
});

export default SignIn;
