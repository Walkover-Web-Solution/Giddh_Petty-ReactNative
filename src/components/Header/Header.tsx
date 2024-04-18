import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { activeOpacity, fonts, fontSize, fontSizes, lineHeight, theme } from '../../theme/theme';
import ArrBack from '../../../assets/images/back-arrow-navigation-svgrepo-com.svg';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  const navigation = useNavigation();
  const selectedCompany = useSelector((state: any) => state?.company?.selectedCompany);

  return (
    <View style={styles.header}>
      {selectedCompany && (
        <TouchableOpacity activeOpacity={activeOpacity.regular} onPress={() => navigation.goBack()}>
          <ArrBack height={25} width={30} />
        </TouchableOpacity>
      )}
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingVertical: 20,
    backgroundColor: theme.colors.black,
    alignItems: 'center',
  },
  headerText: {
    color: theme.colors.white,
    fontSize: fontSize.large.size,
    fontFamily: fonts.bold,
    marginLeft: 20,
    marginBottom: 4,
    lineHeight: fontSize.large.lineHeight
  },
});

export default Header;
