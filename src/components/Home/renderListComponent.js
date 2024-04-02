import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { fonts, theme } from '../../theme/theme';
import Reciept from '../../../assets/images/receipt.svg';
import { capitalizeFirstLetter } from '../../utils/capitalise';

const RenderListItem = ({ item, onPress }) => {
  console.log(item)
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress(item)}
      key={item?.uniqueName}
      style={styles.card}
    >
        <View style={{backgroundColor:theme.colors[item.status],height:2.5,width:8}}>
        </View>
      <View style={styles.cardContent}>
        <View style={styles.logoContainer}>
          <Reciept height={25} />
        </View>
        <View style={styles.cardText}>
          <Text style={styles.cardSubtitle}>{item?.particularAccount?.name}</Text>
          <Text style={styles.cardTitle}>{capitalizeFirstLetter(item?.entryType)}</Text>
        </View>
        <View>
          <Text style={styles.cardAmount}>{item?.currencySymbol}{item?.amount}</Text>
          <Text style={styles.cardDate}>{item?.entryDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    marginTop: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 2,
    elevation: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  logoContainer: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.LightGray,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  cardText: {
    flex: 1,
    marginRight: 10,
  },
  cardSubtitle: {
    fontSize: 12,
    color: theme.colors.gray1,
    fontFamily: fonts.regular,
  },
  cardTitle: {
    fontFamily: fonts.bold,
    marginTop: 3,
  },
  cardAmount: {
    fontFamily: fonts.bold,
    textAlign: 'right',
  },
  cardDate: {
    fontSize: 12,
    color: theme.colors.gray1,
    marginTop: 5,
    paddingLeft: 25,
  },
});

export default memo(RenderListItem);
