import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, ScrollView,SafeAreaView } from 'react-native';
import { activeOpacity, fontSize, fonts, theme } from '../theme/theme';
import { useSelector } from 'react-redux';
import { capitalizeFirstLetter } from '../utils/capitalise';
import AnimatedLoader from "react-native-animated-loader";
import ReturnButton from '../components/TransactionDetails/ReturnButton';
import {  UserCard, DetailRow } from '../components/Transaction/TransactionDetailComponents';
import Header from '../components/Header/Header'
import Reciept from '../../assets/images/receipt.svg'
import ImageViewer from '../components/TransactionDetails/ImageViewer'
import MyBottomSheetModal from '../components/modalSheet/ModalSheet';
import { ProgressBar } from 'react-native-paper';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
const TransactionDetails = () => {
  const selectedExpense = useSelector(state => state?.expenses?.selectedExpense);
  const bottomSheetModalRef = useRef(null);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
      <StatusBar backgroundColor="black" />
      {/* <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255)"
        source={require("./progessBar.json")}
        animationStyle={styles.lottie}
        speed={1}>
      
      </AnimatedLoader> */}
      {/* <ProgressBar indeterminate visible={true} color={theme.colors.primary}/> */}
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
        <Text style={styles.transactionDetail}>Transaction Details</Text>
        <DetailRow label="Status" value={capitalizeFirstLetter(selectedExpense?.status)} />
        <DetailRow label="Entry type" value={capitalizeFirstLetter(selectedExpense?.entryType)} />
        <DetailRow label="Entry date" value={selectedExpense?.entryDate} />
        <DetailRow label="Description" value={selectedExpense?.description || 'N/A'} />
      </View>
      <View style={styles.circleContainer}>
        <View style={styles.circleContainer1}>
          <View style={[styles.halfCircle, styles.upperHalfCircle]} />
          <View style={[styles.halfCircle, styles.lowerHalfCircle]} />
          <View style={styles.circle}>
            <View style={[styles.tickContainer, styles.tickContainerShadow]}>
              {selectedExpense?.attachedFiles 
              ? <TouchableOpacity 
                style={styles.imageIcon}
                activeOpacity={activeOpacity.regular}
                onPress={()=>bottomSheetModalRef?.current?.present()}
                >
              </TouchableOpacity> 
              : <Reciept height={40}/>}
            </View>
          </View>
        </View>
      </View>
      {/* <ReturnButton text={'Edit'} color={theme.colors.black}/> */}
      <MyBottomSheetModal bottomSheetModalRef={bottomSheetModalRef} intialSnap={'60%'} children={<ImageViewer bottomSheetModalRef={bottomSheetModalRef} />} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:theme.colors.black
  },
  subContainer: {
    flex:1,
    backgroundColor:'white'
  },
  blackBackground: {
    backgroundColor: theme.colors.black,
    height: '91%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  whiteSheet: {
    backgroundColor: theme.colors.white,
    height: '67%',
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
    fontSize: fontSize.large.size,
    lineHeight:fontSize.large.lineHeight,
    color: theme.colors.gray,
    textAlign: 'center',
    fontFamily:fonts.regular
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  currency: {
    fontFamily:fonts.bold,
    fontSize: fontSize.xxLarge.size,
    lineHeight:fontSize.xxLarge.lineHeight,
    paddingTop: 3,
    paddingRight: 3,
  },
  amount: {
    fontSize: fontSize.max.size,
    lineHeight:fontSize.max.lineHeight,
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
    fontSize: fontSize.large.size,
    lineHeight:fontSize.large.lineHeight,
    fontFamily:fonts.bold
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
  circleContainer:{
    position: 'absolute',
    top: '14.45%',
    left:'50%',
    transform : [{ translateX: -47 }, { translateY: 0 }],
    width:94,
    height:94,
    borderRadius:50,
    elevation:2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,

  },
  circleContainer1: {
    width: 90,
    height: 90,
    borderRadius: 90,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  tickIcon: {
    fontSize: 22,
    color: theme.colors.secondary,
  },
  imageIcon: {
    borderWidth:2,
    width:'100%',
    height:'100%',
    borderRadius:50
  },
  // lottie: {
  //   width: 100,
  //   height: 100
  // }
});

export default TransactionDetails;
