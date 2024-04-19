import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { activeOpacity, fonts, fontSize, fontSizes, lineHeight, theme } from '../../theme/theme';
import { errorToast } from '../customToast/CustomToast';

const DateRangePicker = ({ setStartDate, setEndDate, bottomSheetModalRef }) => {
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [startDate, setStartDateLocal] = useState(null);
    const [endDate, setEndDateLocal] = useState(null);

    const showStartDatePickerModal = () => {
        setShowStartDatePicker(true);
    };

    const hideStartDatePickerModal = () => {
        setShowStartDatePicker(false);
    };

    const handleStartDateConfirm = (date) => {
        setStartDateLocal(date);
        // setStartDate(formatDate(date));
        hideStartDatePickerModal();
    };

    const showEndDatePickerModal = () => {
        setShowEndDatePicker(true);
    };

    const hideEndDatePickerModal = () => {
        setShowEndDatePicker(false);
    };

    const handleEndDateConfirm = (date) => {
        setEndDateLocal(date);
        // setEndDate(formatDate(date));
        hideEndDatePickerModal();
    };

    const dateValidator = ()=>{
        const start = new Date(startDate);
        const end = new Date(endDate);
        return start<end;
    }
    const handleDone = () => {
        if(dateValidator()){
            setStartDate(formatDate(startDate));
            setEndDate(formatDate(endDate));
            bottomSheetModalRef?.current?.dismiss();
        }else{
            errorToast("Enter a valid date range!");
        }
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.dateButton} activeOpacity={activeOpacity.regular} onPress={showStartDatePickerModal}>
                <Text style={styles.buttonText}>{startDate ? startDate.toDateString() : "Select Start Date"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dateButton} activeOpacity={activeOpacity.regular} onPress={showEndDatePickerModal}>
                <Text style={styles.buttonText}>{endDate ? endDate.toDateString() : "Select End Date"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.doneButton} activeOpacity={activeOpacity.regular} onPress={handleDone}>
                <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={showStartDatePicker}
                mode="date"
                onConfirm={handleStartDateConfirm}
                onCancel={hideStartDatePickerModal}
            />
            <DateTimePickerModal
                isVisible={showEndDatePicker}
                mode="date"
                onConfirm={handleEndDateConfirm}
                onCancel={hideEndDatePickerModal}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginTop: 7,
        paddingHorizontal:10
    },
    dateButton: {
        backgroundColor: theme.colors.LightGray,
        height:50,
        justifyContent:'center',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        marginHorizontal:20,
        elevation: 1,
    },
    doneButton: {
        backgroundColor: theme.colors.black,
        height:50,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        // paddingHorizontal: 10,
        elevation: 5,
        marginVertical:10,
        marginHorizontal:20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#333',
        fontSize: fontSize.regular.size,
        fontFamily: fonts.regular,
        lineHeight: fontSize.regular.lineHeight
    },
    doneButtonText: {
        color: 'white',
        fontSize: fontSize.large.size,
        fontFamily: fonts.regular,
        lineHeight: fontSize.large.lineHeight
    }
});

export default DateRangePicker;
