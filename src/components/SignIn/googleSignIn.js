import { View, Text,StyleSheet,TouchableOpacity,Modal } from 'react-native'
import React,{useState} from 'react'
import SVGImg from '../../../assets/images/icons8-google-20.svg'
import { fonts, theme } from '../../theme/theme';
import SVGMsg from '../../../assets/images/msg.svg'
import { useDispatch } from 'react-redux';
import { OTPVerification } from '@msg91comm/react-native-sendotp';
const SignInButton = (props) => {
   const dispatch = useDispatch();
   const [isModalVisible, setModalVisible] = useState(false);

   const handleOtpSignIn=()=>{
    setModalVisible(true);
   }
   const handleSignIn = () => {
    //  dispatch({type: 'SIGN_IN'});
   };

  return (
    <>
        <TouchableOpacity style={[styles.googleButton,{backgroundColor: props.type=='Otp'?theme.colors.primary:theme.colors.secondary,}]} onPress={props.type==='Otp'?handleOtpSignIn:handleSignIn}>
            <View style={styles.buttonContent}>
                {props.type==='Otp'?<SVGMsg width={20} height={20} paddingVertical={18}></SVGMsg>:<SVGImg marginLeft={20} width={22} height={22} paddingVertical={18}/>}
                <View style={styles.verticalLine} />
                <Text style={styles.googleButtonText}>{props.text}</Text>
            </View>
        </TouchableOpacity>
         <Modal visible={isModalVisible}>
        <OTPVerification 
          onVisible={isModalVisible} 
          onCompletion={(data) => {
            // console.log(data)                       // Get your response of success/failure.
            setModalVisible(false)
          }} 
          widgetId={'33696b6b3344363232333039'}     // Get widgetId from MSG91 OTP Widget Configuration
          authToken={'362701Ty0U36Aq1y064d0e96eP1'}   // Get authToken from MSG91 OTP Tokens
        />
      </Modal>
    </>
  )
}

export default SignInButton;

const styles = StyleSheet.create({
  googleButton: {
    marginRight:130,
    marginTop:20,
    paddingVertical: 4,
    paddingLeft:20,
    paddingRight: 30,
    borderRadius: 50, 
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgLogo:{
    width: 20,
    height: 20,
    paddingVertical: 20,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  verticalLine: {
    height: 20,
    width: 1,
    backgroundColor: theme.colors.white,
    marginHorizontal: 10,
  },
  googleButtonText: {
    color: theme.colors.white,
    fontSize: 15,
    fontFamily:fonts.regular,
  },
});