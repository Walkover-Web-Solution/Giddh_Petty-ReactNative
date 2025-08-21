import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unMountingTwoFactorAuthScreen, VERIFY_OTP } from "../redux/auth/authSlice";
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fonts, fontSize, theme } from "../theme/theme";
import OTPInputView from '@twotalltotems/react-native-otp-input';
import LoaderKit from 'react-native-loader-kit'
import GidhhLogo from '../../assets/images/giddh.png';
import api from "../../interceptor";
import { errorToast, infoToast } from "../components/customToast/CustomToast";

const { width, height } = Dimensions.get('window');

const TwoFactorAuthScreen = () => {
    const dispatch = useDispatch();
    const {tfaDetails, isVerifyingOTP} = useSelector(state => state?.auth);
    const [code, setCode] = useState('');
    const [disableResendButton, setDisableResendButton] = useState(false);

    const sendOTP = async () => {
      setCode('');
      setDisableResendButton(true);
      try {
        let payload = { mobileNumber: tfaDetails.contactNumber, countryCode: tfaDetails.countryCode }
        const response = await api.post(`generate-otp`, payload);
        setDisableResendButton(false);
        if (response?.data?.status == "success") {
          infoToast(response?.data?.body);
        }
      } catch (error) {
        setDisableResendButton(false);
        errorToast(error?.message)
      }
    }
    
    useEffect(() => {
        return () => {
            dispatch(unMountingTwoFactorAuthScreen())
        };
    }, []);
    return (
        <View style={{flex:1}}>
            <View style={style.container}>
                <View style={style.upperContainer}>
                    <Image style={style.logoStyle} source={GidhhLogo} resizeMode="contain" />
                </View>
                <Text style={style.heading}>Verify</Text>
                <Text style={style.message}>
                    We have sent a verification code at {'\n'} <Text style={{ color: theme.colors.black }}>{tfaDetails?.contactNumber}</Text>, enter
                    the code {'\n'}and click on the submit button
                </Text>

                <OTPInputView
                    style={style.otpView}
                    pinCount={4}
                    color={'red'}
                    textContentType="oneTimeCode"
                    placeholderCharacter={'*'}
                    codeInputFieldStyle={'red'}
                    placeholderTextColor={theme.colors.PRIMARY_NORMAL}
                    code={code} // You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    onCodeChanged={code => {
                      setCode(code);
                      // dispatch(clearOTPError())
                    }}
                    autoFocusOnLoad
                    codeInputFieldStyle={style.underlineStyleBase}
                    codeInputHighlightStyle={style.underlineStyleHighLighted}
                    onCodeFilled={(code) => {
                      setCode(code);
                      console.log(`Code is ${code}, you are good to go!`);
                    }}
                />
                <TouchableOpacity disabled={disableResendButton} onPress={() => sendOTP()} 
                  style={style.resendBtn}><Text style={{ color: disableResendButton ? theme.colors.PRIMARY_DISABLED : theme.colors.PRIMARY_BASIC, fontFamily: 'AvenirLTStd-Book' }}>Resend Code</Text></TouchableOpacity>
                <TouchableOpacity style={[style.submitButton, { backgroundColor: code?.length == 4 ? theme.colors.PRIMARY_BASIC : theme.colors.PRIMARY_DISABLED }]} delayPressIn={0} onPress={() => {
                    if (code?.length == 4 && !isVerifyingOTP) {
                      dispatch(VERIFY_OTP({ otp:code, mobileNumber:tfaDetails.contactNumber, countryCode:tfaDetails.countryCode }))
                    }
                }}>
                    <Text style={style.btnText}>Submit</Text>
                </TouchableOpacity>
                {isVerifyingOTP && <View style={style.verifyOtpView}>
                <LoaderKit 
                    style={style.loadKit}
                    name={'CubeTransition'}
                    color={'black'}
                    />
                </View>}
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    borderStyleBase: {
      width: 30,
      height: 45
    },
  
    borderStyleHighLighted: {
      borderColor: '#03DAC6'
    },
  
    underlineStyleBase: {
      width: 50,
      height: 45,
      borderWidth: 0,
      borderBottomWidth: 2,
      borderColor: theme.colors.PRIMARY_BASIC,
      color: theme.colors.PRIMARY_BASIC
    },
  
    underlineStyleHighLighted: {
      borderColor: theme.colors.PRIMARY_BASIC
    },
    logoStyle: {
      resizeMode: 'contain',
      height: 30,
      width: 120
    },
    upperContainer: {
      backgroundColor: '#e0e0e0',
      width: width,
      height: height * 0.1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    heading: { fontSize: 20, fontFamily: 'AvenirLTStd-Black', marginTop: height * 0.1 },
    message: { fontSize: 18, textAlign: 'center', color: '#808080', marginTop: 10,fontFamily: 'AvenirLTStd-Book' },
    submitButton: {
      backgroundColor: theme.colors.PRIMARY_NORMAL,
      height: 50,
      width: width * 0.8,
      marginTop: 10,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center'
    },
    loadKit : { 
        width: 50, 
        height: 50
    },
    container:{ 
      flex: 1, 
      alignItems: 'center', 
      backgroundColor: 'white' 
    },
    otpView:{ 
      width: '65%', 
      height: height * 0.15, 
      color: 'red',
      fontFamily: 'AvenirLTStd-Book' 
    },
    resendBtn:{ 
      paddingHorizontal: 10, 
      paddingVertical: 5 
    },
    btnText: { 
      color: theme.colors.white, 
      fontSize: fontSize.large.size,
      fontFamily: fonts.medium 
    },
    verifyOtpView: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      position: 'absolute', 
      left: 0, 
      right: 0, 
      bottom: 0, 
      top: 0 
    }
  });
  

export default TwoFactorAuthScreen;