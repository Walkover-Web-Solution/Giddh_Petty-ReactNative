import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,TextInput} from 'react-native';
import { fonts, theme } from '../../theme/theme';

const ConfirmationComponent = ({handleLogout,handleClose}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{'Are you sure?'}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.LightGray }]} onPress={handleClose}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.LightGray }]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TextInput/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily:fonts.medium
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 25,
    borderRadius: 5,
    alignItems: 'center',
    elevation:1,
    borderRadius:40,
  },
  buttonText: {
    color: theme.colors.black,
    fontSize: 16,
    fontFamily:fonts.regular
  },
});

export default ConfirmationComponent;
