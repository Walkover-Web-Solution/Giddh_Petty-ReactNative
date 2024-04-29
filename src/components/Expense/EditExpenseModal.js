import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { activeOpacity, fontSize, fonts, lineHeight } from '../../theme/theme';
import { BottomSheetScrollView, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { ScrollView } from 'react-native';

const EditExpense = ({ selectedProduct, selectedItems, setSelectedItems, bottomSheetModalRef }) => {
  const [rate, setRate] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  const handleRateChange = (text) => {
    const rateValue = parseFloat(text);
    setRate(text);
    setTotalAmount(rateValue * 1);
  };

  const productKey = Object.keys(selectedProduct)[0];
  const handleDonePress = () => {
    const updatedSelectedItems = {
      ...selectedItems,
      [productKey]: {
        ...selectedItems[productKey],
        amount: totalAmount,
      },
    };
    setSelectedItems(updatedSelectedItems);
    
    bottomSheetModalRef?.current.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Rate:</Text>
        {Platform.OS === 'ios' ? <BottomSheetTextInput 
          style={styles.input}
          placeholder={'Enter Amount'}
          keyboardType="numeric"
          value={rate}
          onChangeText={handleRateChange}
        /> 
        : 
        <TextInput
          style={styles.input}
          placeholder={'Enter Amount'}
          keyboardType="numeric"
          value={rate}
          onChangeText={handleRateChange}
        />
        }
      </View>

      <View style={styles.row}>
        <Text style={styles.totalAmount}>Total Amount: </Text>
        <Text style={styles.totalAmount}>&#8377;{rate||selectedProduct[productKey].amount.toString()}.00</Text>
      </View>

      <TouchableOpacity style={styles.doneButton} activeOpacity={activeOpacity.regular} onPress={handleDonePress}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:7,
    marginBottom: 20
  },
  label: {
    fontSize: fontSize.large.size,
    fontFamily: fonts.medium,
    lineHeight: fontSize.large.lineHeight
  },
  input: {
    flex: 1,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    fontFamily:fonts.regular,
    fontSize:fontSize.regular.size,
    lineHeight:fontSize.regular.lineHeight
  },
  totalAmount: {
    fontSize: fontSize.regular.size,
    fontFamily: fonts.medium,
    lineHeight: fontSize.regular.lineHeight
  },
  doneButton: {
    backgroundColor: 'black',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    width: '80%',
    alignSelf: 'center',
    marginTop: 15,
    height:50
  },
  buttonText: {
    color: 'white',
    fontSize: fontSize.large.size,
    fontWeight: 'bold',
    fontFamily:fonts.bold,
    lineHeight: fontSize.large.lineHeight
  },
});

export default EditExpense;
