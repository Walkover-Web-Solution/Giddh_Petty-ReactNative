import React from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet } from 'react-native';
import EmailIcon from '../../../assets/images/mail.svg';
import PassIcon from '../../../assets/images/lock.svg';
import { activeOpacity, fontSize, fonts, lineHeight, theme } from '../../theme/theme';
export const RegisteredUser = () => {
  return (
    <View >
      <Text style={styles.heading}>Registered Email ID</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <EmailIcon width={20} height={20} color={theme.colors.gray}/>
          <TextInput style={styles.input} placeholder="Email" />
        </View>
        <View style={styles.inputWrapper}>
          <PassIcon width={20} height={20} color={theme.colors.gray} />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
        </View>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.loginButton} activeOpacity={activeOpacity.regular}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={activeOpacity.regular}>
          <Text style={styles.smallText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.troubleLoggingContainer}>
        <TouchableOpacity activeOpacity={activeOpacity.regular}>
        <Text style={styles.createNewAcc}>Create a new account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginTop: 15,
    fontSize: fontSize.xLarge.size,
    fontFamily:fonts.bold,
    color:theme.colors.black,
    marginBottom: 15,
    lineHeight: fontSize.xLarge.lineHeight
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    borderRadius: 20,
    borderColor: theme.colors.gray,
    paddingLeft: 10,
    borderWidth: StyleSheet.hairlineWidth * 2,
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  loginButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 45,
    alignItems: 'center',
    flex: 0.48,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: fontSize.regular.size,
    fontFamily:fonts.regular,
    lineHeight: fontSize.regular.lineHeight
  },
  smallText: {
    marginTop: 10,
    fontSize: fontSize.large.size,
    fontFamily:fonts.regular,
    marginRight: 10,
    color: theme.colors.black,
    lineHeight: fontSize.large.lineHeight
  },
  troubleLoggingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  clickHereText: {
    color: theme.colors.secondary,
    fontSize: 14,
    marginTop: 13,
    textDecorationLine: 'underline',
    fontFamily:fonts.regular,
    lineHeight: lineHeight.large
  },
  createNewAcc:{fontSize:fontSize.xLarge.size,marginTop:10,color:theme.colors.secondary,textDecorationLine: 'underline',fontFamily:fonts.regular,lineHeight: fontSize.xLarge.lineHeight}
});
