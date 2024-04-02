import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { fonts, theme } from '../theme/theme';
import { useSelector } from 'react-redux';
import { capitalizeFirstLetter } from '../utils/capitalise';
import ReturnButton from '../components/TransactionDetails/ReturnButton';
import {  UserCard, DetailRow } from '../components/Transaction/TransactionDetailComponents';
import Header from '../components/Header/Header'
import Reciept from '../../assets/images/receipt.svg'
const TransactionDetails = () => {
  const selectedExpense = useSelector(state => state?.expenses?.selectedExpense);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" />
      <View style={styles.blackBackground}>
        <Header title='Transaction Details'/>
      </View>
      <View style={styles.whiteSheet}>
        <Text style={styles.transactionID}>Txn id: {selectedExpense?.uniqueName}</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.currency}>{selectedExpense?.currencySymbol}</Text>
          <Text style={styles.amount}>{selectedExpense?.amount}.00</Text>
        </View>
        <UserCard user={selectedExpense?.createdBy} />
        <Text style={styles.transactionDetail}>Transaction Detail</Text>
        <DetailRow label="Status" value={capitalizeFirstLetter(selectedExpense?.status)} />
        <DetailRow label="Entry type" value={capitalizeFirstLetter(selectedExpense?.entryType)} />
        <DetailRow label="Entry date" value={selectedExpense?.entryDate} />
        <DetailRow label="Description" value={selectedExpense?.description || 'N/A'} />
      </View>
      <View style={styles.circleContainer1}>
        <View style={[styles.halfCircle, styles.upperHalfCircle]} />
        <View style={[styles.halfCircle, styles.lowerHalfCircle]} />
        <View style={styles.circle}>
          <View style={[styles.tickContainer, styles.tickContainerShadow]}>
            <Reciept height={40}/>
          </View>
        </View>
      </View>
      <ReturnButton text={'Edit'} color={theme.colors.black}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blackBackground: {
    backgroundColor: theme.colors.black,
    height: '85%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  whiteSheet: {
    backgroundColor: theme.colors.white,
    height: '61%',
    width: '90%',
    position: 'absolute',
    top: '20%',
    left: '5%',
    right: '5%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingTop: 70,
  },
  transactionID: {
    marginBottom: 15,
    fontSize: 16,
    color: theme.colors.gray,
    textAlign: 'center',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  currency: {
    fontFamily:fonts.bold,
    fontSize: 22,
    paddingTop: 3,
    paddingRight: 3,
  },
  amount: {
    fontSize: 30,
    fontFamily:fonts.medium,
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
    fontSize: 16,
    fontFamily:fonts.bold, 
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily:fonts.regular,
    color: theme.colors.gray,
  },
  transactionDetail: {
    paddingLeft: 20,
    marginTop: 18,
    fontSize: 17,
    fontFamily:fonts.bold,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  detailLabel: {
    color: theme.colors.gray,
  },
  detailValue: {
    fontFamily:fonts.bold,
  },
  circleContainer1: {
    width: 90,
    height: 90,
    borderRadius: 90,
    position: 'absolute',
    top: '14.45%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  halfCircle: {
    width: '100%',
    height: '50%',
    position: 'absolute',
  },
  upperHalfCircle: {
    backgroundColor: theme.colors.black,
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    top: 0,
  },
  lowerHalfCircle: {
    backgroundColor: theme.colors.white,
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 90,
    bottom: 0,
  },
  circle: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  tickContainer: {
    backgroundColor:theme.colors.white,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  tickContainerShadow: {
    elevation: 5,
  },
  tickIcon: {
    fontSize: 22,
    color: theme.colors.secondary,
  },
});

export default TransactionDetails;
