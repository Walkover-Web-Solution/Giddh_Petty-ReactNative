import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { activeOpacity, fontSize, fonts, spacing, theme } from '../../theme/theme';
import Feather from '@react-native-vector-icons/feather';
import { ScreenNames } from '../../constants/NavigationConstants';
import { resetPayment } from '../../redux/paymentmode/paymentSlice';

const AddTransactionModal = ({ bottomSheetModalRef, navigation, dispatch }) => {
  return (
    <View style={styles.mainContainer}>
    <View style={styles.container}>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} activeOpacity={activeOpacity.regular} onPress={() => {
            bottomSheetModalRef?.current?.dismiss();
            dispatch(resetPayment());
            navigation.navigate(ScreenNames.NEW_EXPENSE, { name: 'Income' });
          }}>
            <View style={styles.icon}>
              <Feather name="arrow-down-circle" size={30} color={theme.colors.white} />
            </View>
        </TouchableOpacity>
        <Text style={styles.buttonText}>Income</Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} activeOpacity={activeOpacity.regular} onPress={() => {
            bottomSheetModalRef?.current?.dismiss();
            dispatch(resetPayment());
            navigation.navigate(ScreenNames.NEW_EXPENSE, { name: 'Expense' });
          }}>
            <View style={styles.icon}>
              <Feather name="arrow-up-circle" size={30} color={theme.colors.white} />
            </View>
        </TouchableOpacity>
        <Text style={styles.buttonText}>Expense</Text>
      </View>
    </View>
    </View>
  );
};

export default AddTransactionModal;

const styles = StyleSheet.create({
  mainContainer : {
    flexDirection:'column'
  },
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
    flexDirection:'row',
    padding:spacing.small,
  },
  button: {
    paddingVertical: spacing.large,
    paddingHorizontal: spacing.large,
    width: 60,
    height: 60,
    backgroundColor:theme.colors.black,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent:'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  buttonView : {
    alignItems:'center'
  },
  buttonText: {
    color: theme.colors.black,
    fontFamily: fonts.bold,
    textAlign: 'center',
    fontSize:fontSize.large.size
  },
  closeButton: {
    marginTop: 0,
    alignItems:'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.black,
    justifyContent: 'center',
  },
  icon : {
    width:60,
    height:60,
    alignItems:'center',
    justifyContent:'center'
  }
});
