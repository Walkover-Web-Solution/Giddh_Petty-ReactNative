import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { activeOpacity, fontSize, fonts, spacing, theme } from '../../theme/theme';
import Feather from 'react-native-vector-icons/Feather';
import { ScreenNames } from '../../constants/NavigationConstants';
import { resetPayment } from '../../redux/paymentmode/paymentSlice';

const AddTransactionModal = ({ bottomSheetModalRef, navigation, dispatch }) => {
  return (
    <View style={styles.mainContainer}>
    <View style={styles.container}>
      <View>
      <TouchableOpacity style={styles.button} activeOpacity={activeOpacity.regular} onPress={() => {
          bottomSheetModalRef?.current?.dismiss();
          dispatch(resetPayment());
          navigation.navigate(ScreenNames.NEW_EXPENSE, { name: 'Income' });
        }}>
          <View style={styles.icon}>
            <Feather name="arrow-up-circle" size={30} color={theme.colors.white} />
          </View>
      </TouchableOpacity>
            <Text style={styles.buttonText}>Income</Text>
      </View>
      <View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={activeOpacity.regular}
        onPress={() => {
          bottomSheetModalRef?.current?.dismiss();
          dispatch(resetPayment());
          navigation.navigate(ScreenNames.NEW_EXPENSE, { name: 'Expense' });
        }}>
          <View style={styles.icon}>
            <Feather name="dollar-sign" size={25} color={theme.colors.white} />
          </View>
      </TouchableOpacity>
            <Text style={styles.buttonText}>Expense</Text>
      </View>
    </View>
    {/* <View style={{alignItems:'center'}}>
    <TouchableOpacity style={styles.closeButton} onPress={() => bottomSheetModalRef?.current?.dismiss()}>
      <Feather name="x-circle" size={25} color={theme.colors.black} />
    </TouchableOpacity>
    </View> */}
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
    // marginHorizontal:20,
    marginTop: 10,
    flexDirection:'row',
    padding:spacing.small,
    // height:140,
    // borderWidth:2
  },
  button: {
    paddingVertical: spacing.large,
    paddingHorizontal: spacing.large,
    // width:100,
    // height:25,
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
    // marginHorizontal: 10,
    // backgroundColor: 'white',
  },
  buttonText: {
    color: theme.colors.white,
    fontFamily: fonts.bold,
    textAlign: 'center',
    fontSize:fontSize.large.size,
    lineHeight:fontSize.large.lineHeight
  },
  closeButton: {
    marginTop: 0,
    alignItems:'center',

    //  position: 'absolute',
    // bottom: '7%',
    // right: '50%',
    // transform: [{ translateX: 30 }, { translateY: 30 }],
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.black,
    // alignItems: 'center',
    justifyContent: 'center',
    // elevation: 5,
    // marginBottom: 20,
  },
  icon : {
    width:60,
    height:60,
    alignItems:'center',
    justifyContent:'center'
  }
});
