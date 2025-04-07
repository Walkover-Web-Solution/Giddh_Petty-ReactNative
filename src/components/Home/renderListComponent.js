import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { activeOpacity, fontSize, fonts, lineHeight, theme } from '../../theme/theme';
import Reciept from '../../../assets/images/receipt.svg';
import { capitalizeFirstLetter } from '../../utils/capitalise';
import api from '../../../interceptor';
import FastImage from 'react-native-fast-image';

const RenderListItem = ({ item, onPress, uniqueName }) => {
  // console.log(item)
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity.regular}
      onPress={() => onPress(item)}
      key={item?.uniqueName}
      style={styles.card}
    >
        <View style={[styles.badgeIndicator,{borderLeftColor:theme.colors[item.status]}]}>
        </View>
      <View style={styles.cardContent}>
        <View style={styles.logoContainer}>
          {item?.fileNames?.[0]?.length > 0 ? 
            <FastImage source={{
                uri: api?.getUri()+`company/${uniqueName}/image/`+item?.fileNames?.[0] ,
              }}
              style={styles.imageIcon}
              resizeMode={FastImage.resizeMode.cover}
            /> : 
            <Reciept height={25} />}
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
    paddingHorizontal: 15
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
    fontSize: fontSize.small.size,
    color: theme.colors.gray1,
    fontFamily: fonts.regular,
    lineHeight: fontSize.small.lineHeight
  },
  cardTitle: {
    fontFamily: fonts.bold,
    marginTop: 3,
    fontSize:fontSize.regular.size,
    lineHeight:fontSize.regular.lineHeight
  },
  cardAmount: {
    fontFamily: fonts.bold,
    textAlign: 'right',
    fontSize: fontSize.regular.size,
    lineHeight:fontSize.regular.lineHeight
  },
  cardDate: {
    fontSize: fontSize.small.size,
    color: theme.colors.gray1,
    marginTop: 5,
    paddingLeft: 25,
    fontFamily:fonts.regular,
    lineHeight: fontSize.small.lineHeight
  },
  badgeIndicator: {
    position:'absolute',
    left:0,
    right:0,
    width:10,
    borderLeftWidth:13,
    borderBottomWidth:13,
    borderBottomColor:'transparent',
  },
  imageIcon: {
    width:'100%',
    height:'100%',
    borderRadius:50
  }
});

export default memo(RenderListItem);
