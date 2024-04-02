import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { fonts, theme } from '../../theme/theme';
import GidhhLogo from '../../../assets/images/Giddh-Bluesvg.png';

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Login To </Text>
      <Image
        source={GidhhLogo}
        style={styles.headerLogo}
        resizeMode="contain"
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  headerText: {
    fontFamily: fonts.bold,
    fontSize: 32,
    color: theme.colors.black,
    marginRight: 10,
  },
  headerLogo: {
    width: 120,
    height: 60,
    marginTop: 10,
  },
});
