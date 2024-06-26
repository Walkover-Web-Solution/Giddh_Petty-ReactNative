import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { activeOpacity, fontSize, fonts, lineHeight, spacing, theme } from '../../theme/theme';
const ReturnButton = ({text,color}) => {
    const navigation=useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={activeOpacity.regular} onPress={()=>navigation.goBack()} style={[styles.button,{backgroundColor:color}]}>
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
    paddingVertical: spacing.medium,
  },
  buttonText: {
    fontSize: fontSize.large.size,
    fontFamily: fonts.bold,
    lineHeight: fontSize.large.lineHeight
  },
});

export default ReturnButton;
