import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, DeviceEventEmitter, Modal, Pressable } from 'react-native';
import { activeOpacity, fontSize, fonts, theme } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../constants/NavigationConstants';
import axios from 'axios'; 
import {useSelector} from 'react-redux';
import { errorToast } from '../customToast/CustomToast';
import AntDesign from '@react-native-vector-icons/ant-design';

const RowWithButtons = ({ name, selectedItem, getBack,companyUniqueName, prepareRequestBody, isSubmittingRef }) => {
  const navigation = useNavigation();
  const user = useSelector(state => state?.auth?.user);
  const [showModal,setShowModal] = useState(false);
  const [isSuccess,setIsSuccess] = useState(false);
  const [apiResponse,setApiResponse] = useState('');
  const handleSaveButton = async () => {
    if(isSubmittingRef.current){
      return;
    }
    const requestBody = prepareRequestBody();
    console.log("enter",requestBody);
    if(!requestBody?.baseAccount?.uniqueName){
      errorToast("Choose Payment Mode!");
      return;
    }
    if(requestBody?.transactions?.length == 0){
      errorToast("Transactions cannot be empty.");
      return ;
    }
    const services = requestBody?.transactions?.filter((item)=>item.amount == 0);
    if(services?.length > 0){
      errorToast("Entry amount should be greater than zero for ",services?.[0]?.name);
      return;
    }
    const entryType = name === 'Income' ? 'Sales' : name;
    isSubmittingRef.current = true;
    try {
      const response = await axios.post(`https://api.giddh.com/company/${companyUniqueName}/pettycash-manager/generate?entryType=${entryType.toLowerCase()}`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'session-id': user?.session?.id,
        },
      });
      console.log("api response",response?.body);
      setShowModal(true);
      if(response?.data?.status === 'success'){
        setApiResponse('Success!');
        setIsSuccess(true);
      }else{
        setApiResponse(response?.body?.message);
        setIsSuccess(false);
      }
    } catch (error) {
      setShowModal(true);
      setIsSuccess(false);
      let errorMessage = 'Something went wrong!';
      if (error?.response) {
        errorMessage = error.response.data.message || error.response.data.error || errorMessage;
      } else if (error?.request) {
        errorMessage = 'No response from server. Please try again later.';
      } else {
        errorMessage = error?.message;
      }
      setApiResponse(errorMessage);
      console.error('Error:', error);
    }
  };
const modalClose = ()=>{
  setShowModal(!showModal);
  isSubmittingRef.current = false;
  if(isSuccess){
    DeviceEventEmitter.emit('successResponse');
    navigation.navigate(ScreenNames.DRAWER);
  }
}

  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isSubmittingRef.current && styles.disabledButton]}
        activeOpacity={activeOpacity.regular}
        onPress={handleSaveButton}
      >
        <Text style={[styles.buttonText, isSubmittingRef.current && styles.disabledButtonText]}>
          {isSubmittingRef.current ? 'Saving...' : 'Save'}
        </Text>
      </TouchableOpacity>
    </View>
      <Modal 
        animationType="fade"
        transparent={true}
        visible={showModal}
        statusBarTranslucent={true}
        navigationBarTranslucent={false}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {isSuccess 
              ? <AntDesign name='file-done' size={90} color={theme.colors.black} style={styles.icon}/>
              : <AntDesign name='file-exclamation' size={90} color={theme.colors.black} style={styles.icon}/>
              }
            {isSuccess ? <Text style={styles.buttonText}>{apiResponse}</Text>
            : <Text style={styles.buttonText}>{apiResponse}</Text>}
            <Pressable
              style={isSuccess ? styles.doneButton : styles.errorBtn}
              onPress={modalClose}>
              <Text style={[styles.buttonText,{color:'white'}]}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  button: {
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    height:50,
    borderRadius:100
  },
  buttonText: {
    color: 'black',
    fontSize: fontSize.large.size,
    fontFamily: fonts.regular,
    padding: 4,
    lineHeight: fontSize.large.lineHeight
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width:300,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  doneButton: {
    marginTop:30,
    width: 150,
    height: 50,
    borderRadius: 60,
    backgroundColor: theme.colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  errorBtn: {
    marginTop:30,
    width: 150,
    height: 50,
    borderRadius: 60,
    backgroundColor: theme.colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  icon : {
    padding : 10
  },
  disabledButton: {
    opacity: 0.6,
  },
  disabledButtonText: {
    opacity: 0.8,
  }
});

export default RowWithButtons;
