import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { fonts, theme } from '../../theme/theme';
const ReturnButton = ({text,color}) => {
    const navigation=useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.goBack()} style={[styles.button,{backgroundColor:color}]}>
        <Text style={[styles.buttonText,{color:text==='Edit'?theme.colors.white:theme.colors.black}]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 30,
  },
  button: {
    width: '80%',
    borderRadius: 100, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.bold,
  },
});

export default ReturnButton;
