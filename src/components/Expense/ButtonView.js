import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, DeviceEventEmitter, Modal, Pressable } from 'react-native';
import { activeOpacity, fontSize, fonts, lineHeight, theme } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { ScreenNames } from '../../constants/NavigationConstants';
import axios from 'axios'; 
import {useSelector} from 'react-redux';
import { errorToast } from '../customToast/CustomToast';
const RowWithButtons = ({ name, selectedItem, getBack,companyUniqueName, prepareRequestBody }) => {
  const navigation = useNavigation();
  const user = useSelector(state => state?.auth?.user);
  const [showModal,setShowModal] = useState(false);
  const [isSuccess,setIsSuccess] = useState(false);
  const [apiResponse,setApiResponse] = useState('');
  const selectedMode = useSelector((state)=>state?.payment?.selectedMode);
  const handleSaveButton = async () => {
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
    try {
      const response = await axios.post(`https://api.giddh.com/company/${companyUniqueName}/pettycash-manager/generate?entryType=${entryType.toLowerCase()}`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'session-id': user?.session?.id,
        },
      });
      console.log("api response",response?.body);
      setShowModal(true);
      if(response?.data?.status){
        setApiResponse('Success!');
        setIsSuccess(true);
      }else{
        setApiResponse(response?.body?.message);
        setIsSuccess(false);
      }
    } catch (error) {
      setShowModal(true);
      setIsSuccess(false);
      setApiResponse('Something went wrong!');
      console.error('Error:', error);
    }
  };
const modalClose = ()=>{
  setShowModal(!showModal);
  if(isSuccess){
    DeviceEventEmitter.emit('successResponse');
    navigation.navigate(ScreenNames.DRAWER);
  }
}

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={activeOpacity.regular}
        onPress={() => navigation.navigate(ScreenNames.ADD_EXPENSE, { selectedItem: selectedItem, getBack: getBack, name: name })}
      >
        <Text style={styles.buttonText}>Add {name}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={activeOpacity.regular}
        onPress={handleSaveButton}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <Modal 
        animationType="fade"
        transparent={true}
        visible={showModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {isSuccess 
              ? <Icon name='file-circle-check' size={100} color={theme.colors.black} style={styles.icon}/>
              : <Icon name='file-circle-exclamation' size={100} color={theme.colors.black} style={styles.icon}/>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical:20,
    marginTop: 10,
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
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
  }
});

export default RowWithButtons;
