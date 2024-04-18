import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Header } from '../components/Header/Header';
import { activeOpacity, fontSize, fonts, lineHeight } from '../theme/theme';

const EditExpenseScreen = () => {
  const [rate, setRate] = useState('');
  const [amount, setAmount] = useState('');
  const [discount, setDiscount] = useState('');
  const [fixedDiscount, setFixedDiscount] = useState('');
  const [selectedButton, setSelectedButton] = useState('HSN');
  const [description, setDescription] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  const handleButtonSelection = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const calculateTotalAmount = () => {
    const calculatedAmount = // Your calculation logic here using rate, amount, discount, fixedDiscount
    setTotalAmount(calculatedAmount);
  };

  return (
    <>
      <Header title={'Sales'} />  
      <View style={styles.container}>
        <View style={styles.inputRow}>
          <View style={styles.inputColumn}>
            <Text style={styles.inputTitle}>Rate</Text>
            <TextInput
              style={styles.inputField}
              value={rate}
              onChangeText={setRate}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputColumn}>
            <Text style={styles.inputTitle}>Amount</Text>
            <TextInput
              style={styles.inputField}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.inputColumn}>
            <Text style={styles.inputTitle}>Discount</Text>
            <TextInput
              style={styles.inputField}
              value={discount}
              onChangeText={setDiscount}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputColumn}>
            <Text style={styles.inputTitle}>Fixed Discount</Text>
            <TextInput
              style={styles.inputField}
              value={fixedDiscount}
              onChangeText={setFixedDiscount}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.inputTitle}>Total Amount: Rs. {totalAmount}</Text>
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.inputTitle}>Description</Text>
          <TextInput
            style={styles.inputField}
            value={description}
            onChangeText={setDescription}
            multiline={true}
            numberOfLines={4}
          />
        </View>
        <TouchableOpacity style={styles.doneButton} activeOpacity={activeOpacity.regular}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputColumn: {
    flex: 1,
    marginRight: 10,
  },
  inputTitle: {
    marginBottom: 5,
    fontSize: fontSize.large.size,
    fontFamily:fonts.bold,
    lineHeight: fontSize.large.lineHeight
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
  },
  calculateButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  doneButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    // fontWeight: 'bold',
    fontFamily:fonts.bold,
    fontSize:fontSize.regular.size,
    lineHeight:fontSize.regular.lineHeight
  },
});

export default EditExpenseScreen;
