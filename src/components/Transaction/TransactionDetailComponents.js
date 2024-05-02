
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { activeOpacity, fontSize, fonts, lineHeight, theme } from '../../theme/theme';
import ArrBack from '../../../assets/images/back-arrow-navigation-svgrepo-com.svg';
import { useNavigation } from '@react-navigation/native';

export const Header = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={activeOpacity.regular} onPress={() => navigation.goBack()}>
        <ArrBack height={25} width={30} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

export const UserCard = ({ user }) => {
  return (
    <View style={styles.card}>
      <Image source={require('../../../assets/images/user-picture.png')} style={styles.cardImage} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{user?.name}</Text>
        <Text style={styles.cardSubtitle}>{user?.uniqueName}</Text>
      </View>
    </View>
  );
};

export const DetailRow = ({ label, value }) => {
  return (
    <View>
      {(value !== 'N/A' && label === 'Description') 
      ? <View style={[styles.detailRow,{flexDirection:'column'}]}>
          <Text style={styles.detailLabel}>{label}:</Text>
          <Text numberOfLines={3} style={[styles.detailValue,{marginVertical:5}]}>{value}</Text>
        </View>
        : <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingVertical: 20,
    backgroundColor:theme.colors.black
  },
  headerText: {
    color: theme.colors.white,
    fontSize: fontSize.large.size,
    fontFamily:fonts.bold,
    textAlign: 'center',
    marginLeft: 76,
    lineHeight: fontSize.large.lineHeight
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.LightGray,
    elevation: 1,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.white,
  },
  cardTextContainer: {
    marginLeft: 10,
  },
  cardTitle: {
    fontSize: fontSize.large.size,
    fontFamily:fonts.bold,
    lineHeight: fontSize.large.lineHeight
  },
  cardSubtitle: {
    fontSize: fontSize.regular.size,
    fontFamily:fonts.regular,
    color: 'gray',
    lineHeight: fontSize.regular.lineHeight
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  detailLabel: {
    color: theme.colors.gray,
    fontFamily:fonts.regular,
    fontSize:fontSize.regular.size,
    lineHeight: fontSize.regular.lineHeight
  },
  detailValue: {
    fontFamily:fonts.bold,
    fontSize:fontSize.regular.size,
    lineHeight:fontSize.regular.lineHeight
  },
});

export default { Header, UserCard, DetailRow };
