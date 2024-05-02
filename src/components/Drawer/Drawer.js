import React,{useState,useRef} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet ,Linking,DeviceEventEmitter, SafeAreaView} from 'react-native';
import LogOutIcon from '../../../assets/images/power.svg';
import {useSelector,useDispatch} from 'react-redux';
import { activeOpacity, fontSize, fonts, lineHeight, theme } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';
import { signInSuccess, signOut } from '../../redux/auth/authSlice';
import { fetchCompanyListSuccess, resetCompany, setSelectedCompany } from '../../redux/company/CompanySlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetBranch, setSelectedBranch } from '../../redux/company/BranchSlice';
import Clipboard from '@react-native-clipboard/clipboard';
import CompanySvg from '../../..//assets/images/nocompany-ico.svg';
import CopySVG from '../../../assets/images/copy.svg'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { capitalizeFirstLetter } from '../../utils/capitalise';
import { showToast } from '../../utils/toast';
import ConfirmationComponent from './ConfirmButton';
import MyBottomSheetModal from '../modalSheet/ModalSheet';
import PaymentModeSelector from '../Expense/ModalComponent';
import { resetExpenses } from '../../redux/expense/ExpenseSlice';
import ScheduleMeet from '../scheduleMeet/scheduleMeet';
const CustomDrawer = ({setVisible,navigation}) => {
  const openGmail = (email) => {
    const gmailUrl = `mailto:${email}`;

    Linking.openURL(gmailUrl).catch((err) => console.error('An error occurred', err));
  };
  const copyToClipboard = (text) => {
    Clipboard.setString(text);
  };
  const bottomSheetModalRef=useRef(null);
  const companyNames = useSelector((state) => state?.company?.selectedCompany);
  const branch=useSelector((state)=>state?.branch?.selectedBranch);
  const user=useSelector((state)=>state?.auth?.user);
  const photo=useSelector((state)=>state?.auth?.photo);
  const dispatch = useDispatch();
  const handleClose=()=>{
    bottomSheetModalRef.current.dismiss();
  }
  const handleLogout = async () => {
    try {
      dispatch({type:'SIGN_OUT'})
    if(photo){
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
    await AsyncStorage.clear();
    dispatch(signOut(null));
    dispatch(resetCompany([]))
    dispatch(resetBranch(null))
    dispatch(resetExpenses())
  } catch (error) {
    console.error('Error during logout:', error);
  }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
      <View style={styles.drawerHeader}>
        <View>
          <Image source={photo?{uri:photo}:require('../../../assets/images/user-picture.png')} style={styles.drawerImage} />
          <View style={styles.userInfo}>
            <Text style={styles.drawerText}>{user?.user?.name}</Text>
            <Text numberOfLines={1} style={styles.drawerText}>{user?.user?.email}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.switchCompanyButton} activeOpacity={activeOpacity.regular} onPress={()=>{   navigation.push('Company')}}>
          <CompanySvg height={20} width={20} color={theme.colors.black} />
          <Text style={styles.switchCompanyButtonText}>{capitalizeFirstLetter(companyNames.name)}</Text>
        </TouchableOpacity>
        {companyNames?.branchCount>1&&<TouchableOpacity style={styles.switchCompanyButton} activeOpacity={activeOpacity.regular} onPress={()=>{ navigation.navigate('Branch')}}>
          <Feather name="git-merge" size={20} color={theme.colors.black}/>
          <Text style={[styles.switchCompanyButtonText]}>{capitalizeFirstLetter(branch?.alias)}</Text>
        </TouchableOpacity>}
        <TouchableOpacity style={styles.switchCompanyButton} activeOpacity={activeOpacity.regular} onPress={() => DeviceEventEmitter.emit("showHelloWidget", { status: true })}>
          <MaterialIcons name="support-agent" size={20} color={theme.colors.black} />
          <Text style={[styles.switchCompanyButtonText]}>{'Chat with us'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.switchCompanyButton} activeOpacity={activeOpacity.regular} onPress={()=>{  setVisible(true);navigation.navigate('ScheduleMeet')}}>
          <AntDesign name="calendar" size={20} color={theme.colors.black} />
          <Text style={[styles.switchCompanyButtonText]}>{'Schedule meet'}</Text>
        </TouchableOpacity>
      <View style={styles.contactContainer}>
        <Text style={styles.contactText}>Contact Us</Text>
        <View style={styles.contactDetail}>
          <Text style={styles.mailText} onPress={()=>openGmail('sales@giddh.com')}>Sales: sales@giddh.com</Text>
          <TouchableOpacity activeOpacity={activeOpacity.regular} onPress={()=>{copyToClipboard('sales@giddh.com');showToast();}}><CopySVG width={17} height={17} paddingLeft={40} marginTop={3}/></TouchableOpacity>
        </View>
        <View style={styles.contactDetail}>
        <Text style={styles.mailText} onPress={()=>openGmail('support@giddh.com')}>Support: support@giddh.com</Text>
        <TouchableOpacity activeOpacity={activeOpacity.regular} onPress={()=>{copyToClipboard('support@giddh.com');showToast();}}><CopySVG width={17} height={17} paddingLeft={40} marginTop={3}/></TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} activeOpacity={activeOpacity.regular} onPress={()=>bottomSheetModalRef.current?.present()}>
          <AntDesign name="logout" size={25} color={theme.colors.black} />
          <Text style={[styles.switchCompanyButtonText,{fontFamily:fonts.medium}]}>Logout</Text>
      </TouchableOpacity>
      <MyBottomSheetModal snapArr={['20%']} bottomSheetModalRef={bottomSheetModalRef} intialSnap={'17%'} children={<ConfirmationComponent handleClose={handleClose} handleLogout={handleLogout}/>}/>
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor:theme.colors.black
  },
  subContainer:{
    flex:1,
    backgroundColor:'white'
  },
  drawerHeader: {
    alignItems: 'start',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.white,
    paddingBottom: 15,
    backgroundColor:theme.colors.black
  },
  userInfo: {
    flexDirection: 'column',
  },
  drawerImage: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor:theme.colors.white,
    marginBottom: 10,
    borderColor:theme.colors.white,
    borderWidth:1.4,
  },
  drawerText: {
    fontSize: fontSize.large.size,
    marginBottom: 3,
    color: theme.colors.white,
    fontFamily:fonts.regular,
    lineHeight: fontSize.large.lineHeight
  },
  buttonsContainer: {
    flex: 1,
    marginTop:25,
    backgroundColor:theme.colors.white
  },
  switchCompanyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    // paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom:20
  },
  switchCompanyButtonText: {
    color: 'black',
    // fontWeight: '400',
    fontSize: fontSize.large.size,
    paddingHorizontal:20,
    // paddingBottom:3,
    fontFamily:fonts.regular,
    lineHeight: fontSize.large.lineHeight
  },
  contactContainer : {
    flex:1,
    backgroundColor:theme.colors.white,
    marginTop: 10
  },
  contactText : {
    marginBottom:15,
    fontSize:fontSize.xLarge.size,
    paddingLeft:20,
    fontFamily:fonts.bold,
    lineHeight: fontSize.xLarge.lineHeight
  },
  contactDetail : {
    flexDirection:'row',
    marginBottom:7,
    alignItems:'center'
  },
  mailText : {
    fontSize:fontSize.regular.size,
    paddingLeft:20,
    fontFamily:fonts.medium,
    lineHeight: fontSize.regular.lineHeight
  },
  logoutButton: {
    backgroundColor:theme.colors.LightGray,
    justifyContent:'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  logoutTextContainer: {
    marginLeft: 10,
  },
  logoutText: {
    color: 'black',
    fontSize:17,
    fontFamily:fonts.regular,
    lineHeight: lineHeight.large
  },
  logoutSubText: {
    color: 'black',
    fontSize: 15,
    fontFamily:fonts.regular,
    lineHeight: lineHeight.large
  },
});

export default CustomDrawer;
