import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { activeOpacity, fontSize, fonts } from '../../theme/theme';
import {useSelector,useDispatch } from 'react-redux';
import { setSelectedPaymentMode } from '../../redux/paymentmode/paymentSlice';
const PaymentModeSelector = ({ bottomSheetModalRef}) => {
    const dispatch = useDispatch();
    const paymentModes=useSelector((state)=>state.payment?.paymentMode);
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Select Mode of Payment</Text>
            {paymentModes.map(payment => (
                <TouchableOpacity key={payment?.uniqueName} style={styles.option} activeOpacity={activeOpacity.regular} onPress={()=>{dispatch(setSelectedPaymentMode(payment));bottomSheetModalRef?.current.dismiss()}}>
                    <Text style={styles.optionText}>{payment?.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: 'white',
    },
    heading: {
        fontSize: fontSize.large.size,
        fontFamily: fonts.bold,
        marginBottom: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        height:45,
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
        height:'100%'
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
        paddingVertical: 15,
        marginHorizontal: 5,
    },
    optionText: {
        fontSize: fontSize.large.size,
        fontFamily: fonts.medium,
    },
});

export default PaymentModeSelector;
