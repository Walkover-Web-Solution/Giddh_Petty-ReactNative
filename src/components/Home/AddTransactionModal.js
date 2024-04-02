import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { fonts, theme } from '../../theme/theme';
import Feather from 'react-native-vector-icons/Feather';
import { ScreenNames } from '../../constants/NavigationConstants';
import { resetPayment } from '../../redux/paymentmode/paymentSlice';

const AddTransactionModal = ({ bottomSheetModalRef, navigation, dispatch }) => {
  return (
    <>
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Withdraw')}>
          <Feather name="arrow-down-circle" size={25} color={theme.colors.black} />
        </TouchableOpacity>
        <Text style={styles.buttonText}>Withdraw</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => {
            bottomSheetModalRef?.current?.dismiss();
            dispatch(resetPayment());
            navigation.navigate(ScreenNames.NEW_EXPENSE, { name: 'Income' });
          }}>
          <Feather name="arrow-up-circle" size={25} color={theme.colors.black} />
        </TouchableOpacity>
        <Text style={styles.buttonText}>Income</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            bottomSheetModalRef?.current?.dismiss();
            dispatch(resetPayment());
            navigation.navigate(ScreenNames.NEW_EXPENSE, { name: 'Expense' });
          }}>
          <Feather name="dollar-sign" size={25} color={theme.colors.black} />
        </TouchableOpacity>
        <Text style={styles.buttonText}>Expense</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.closeButton} onPress={() => bottomSheetModalRef?.current?.dismiss()}>
      <Feather name="x-circle" size={25} color={theme.colors.black} />
    </TouchableOpacity>
    </>
  );
};

export default AddTransactionModal;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal:20,
    marginTop: 10,
    flexDirection:'row'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    marginBottom: 5,
    marginHorizontal: 10,
    backgroundColor: 'white',
  },
  buttonText: {
    color: theme.colors.black,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 30,
    alignItems:'center',
  },
});
