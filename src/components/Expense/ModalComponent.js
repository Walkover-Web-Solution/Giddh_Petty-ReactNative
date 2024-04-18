import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { activeOpacity, fontSize, fonts, lineHeight } from '../../theme/theme';
import axios from 'axios';
import {useSelector,useDispatch } from 'react-redux';
import { setSelectedPaymentMode } from '../../redux/paymentmode/paymentSlice';
const PaymentModeSelector = ({ bottomSheetModalRef}) => {
    const dispatch = useDispatch();
    const paymentModes=useSelector((state)=>state.payment?.paymentMode);
    // console.log("paymentModes",paymentModes);
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Select Mode of Payment</Text>
            <View style={styles.searchContainer}>
                <View style={styles.searchField}>
                    <AntDesign name="search1" size={20} color="black" style={styles.searchIcon} />
                    <TextInput placeholder="Search..." style={styles.input} />
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.optionsContainer}>
                {paymentModes.map(payment => (
                    <TouchableOpacity key={payment?.uniqueName} style={styles.option} activeOpacity={activeOpacity.regular} onPress={()=>{dispatch(setSelectedPaymentMode(payment));bottomSheetModalRef?.current.dismiss()}}>
                        <Text style={styles.optionText}>{payment?.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 20,
    },
    heading: {
        fontSize: fontSize.large.size,
        fontFamily: fonts.bold,
        marginBottom: 10,
        lineHeight: fontSize.large.lineHeight
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchField: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 20,
        paddingLeft: 10,
    },
    input: {
        flex: 1,
        height: '100%',
        fontFamily:fonts.regular
    },
    optionsContainer: {
        marginTop: 10,
    },
    option: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft:10,
        borderRadius: 5,
        paddingVertical: 10,
        marginHorizontal: 5,
        marginBottom: 10,
    },
    optionText: {
        fontSize: fontSize.large.size,
        fontFamily: fonts.medium,
        lineHeight: fontSize.large.lineHeight
    },
});

export default PaymentModeSelector;
