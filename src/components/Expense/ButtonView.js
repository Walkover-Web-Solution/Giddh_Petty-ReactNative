import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, DeviceEventEmitter } from 'react-native';
import { theme } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../constants/NavigationConstants';
import axios from 'axios'; 
import {useSelector} from 'react-redux';
const RowWithButtons = ({ name, selectedItem, getBack,companyUniqueName, prepareRequestBody }) => {
  const navigation = useNavigation();
  const user = useSelector(state => state?.auth?.user);
  const handleSaveButton = async () => {
    const requestBody = prepareRequestBody();
    try {
      const response = await axios.post(`https://api.giddh.com/company/${companyUniqueName}/pettycash-manager/generate?entryType=${name.toLowerCase()}`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'session-id': user?.session?.id,
        },
      });
      if(response?.data?.status)
        DeviceEventEmitter.emit('successResponse');
      navigation.navigate(ScreenNames.DRAWER);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(ScreenNames.ADD_EXPENSE, { selectedItem: selectedItem, getBack: getBack, name: name })}
      >
        <Text style={styles.buttonText}>Add {name}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: true ? theme.colors.gray2 : 'white' }]}
        onPress={handleSaveButton}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
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
    fontSize: 16,
    fontFamily: 'Helvetica',
  },
});

export default RowWithButtons;
