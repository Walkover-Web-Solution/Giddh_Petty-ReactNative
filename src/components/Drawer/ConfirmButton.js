import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,TextInput, Platform} from 'react-native';
import { activeOpacity, fontSize, fonts, lineHeight, spacing, theme } from '../../theme/theme';

const ConfirmationComponent = ({handleLogout,handleClose}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{'Are you sure?'}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} activeOpacity={activeOpacity.regular} onPress={handleClose}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} activeOpacity={activeOpacity.regular} onPress={handleLogout}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    flexDirection:'column'
  },
  message: {
    fontSize: fontSize.xLarge.size,
    marginBottom: 10,
    fontFamily:fonts.medium,
    lineHeight: fontSize.xLarge.lineHeight
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    width: '80%',
    padding:3
  },
  button: {
    flex:1,
    marginHorizontal:7,
    // width:'50%',
    height:50,
    padding:spacing.small,
    // paddingVertical: 10,
    // marginLeft: 25,
    alignItems: 'center',
    justifyContent:'center',
    elevation:1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    borderRadius:40,
    backgroundColor: theme.colors.LightGray
  },
  buttonText: {
    // borderWidth:3,
    color: theme.colors.black,
    fontSize: fontSize.large.size,
    lineHeight: fontSize.large.lineHeight,
    fontFamily:fonts.regular
  },
});

export default ConfirmationComponent;
