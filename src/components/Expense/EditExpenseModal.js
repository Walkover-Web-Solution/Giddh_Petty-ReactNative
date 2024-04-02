import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { fonts } from '../../theme/theme';

const EditExpense = ({ selectedProduct, selectedItems, setSelectedItems, bottomSheetModalRef }) => {
  const [rate, setRate] = useState(0);
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
        <TextInput
          style={styles.input}
          placeholder={selectedProduct[productKey].amount.toString()}
          keyboardType="numeric"
          value={rate}
          onChangeText={handleRateChange}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.totalAmount}>Total Amount</Text>
        <Text style={styles.totalAmount}>{rate||selectedProduct[productKey].amount.toString()}.00</Text>
      </View>

      <TouchableOpacity style={styles.doneButton} onPress={handleDonePress}>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.medium,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  totalAmount: {
    fontSize: 14,
    fontFamily: fonts.medium,
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
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditExpense;
