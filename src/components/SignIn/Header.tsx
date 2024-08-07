import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { fontSize, fontSizes, fonts, lineHeight, styleFonts, theme } from '../../theme/theme';
import GidhhLogo from '../../../assets/images/Giddh-Bluesvg(1).png';

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Login To </Text>
        <Image
          source={GidhhLogo}
          style={styles.headerLogo}
          resizeMode="contain"
          />
      </View>
        <Text style={styles.text}>Petty Cash</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    flexDirection:'column',
    paddingVertical:15
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: fonts.bold,
    fontSize: fontSize.max.size,
    color: theme.colors.black,
    marginRight: 10,
    lineHeight: fontSize.max.lineHeight
  },
  headerLogo: {
    width: 120,
    height: 60
  },
  text: {
    fontSize: fontSize.xxxLarge.size,
    fontFamily : styleFonts.bold,
    lineHeight: fontSize.xxxLarge.lineHeight
  }
});
