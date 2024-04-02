import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { fonts, fontSizes, theme } from '../../theme/theme';

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
        setStartDate(formatDate(date));
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
        setEndDate(formatDate(date));
        hideEndDatePickerModal();
    };

    const handleDone = () => {
        bottomSheetModalRef?.current?.dismiss();
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    };

    return (
        <View style={styles.container}>
            <View style={{ marginLeft: 20 }}>
                <Text style={{ fontSize: fontSizes.large, fontFamily: fonts.regular, color: '#333' }}>
                    Start Date:
                </Text>
            </View>
            <TouchableOpacity style={styles.dateButton} onPress={showStartDatePickerModal}>
                <Text style={styles.buttonText}>{startDate ? startDate.toDateString() : "Select Start Date"}</Text>
            </TouchableOpacity>
            <View style={{ marginLeft: 20, marginTop: 15 }}>
                <Text style={{ fontSize: fontSizes.large, fontFamily: fonts.regular, color: '#333' }}>
                    End Date:
                </Text>
            </View>
            <TouchableOpacity style={styles.dateButton} onPress={showEndDatePickerModal}>
                <Text style={styles.buttonText}>{endDate ? endDate.toDateString() : "Select End Date"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
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
        marginTop: 20,
    },
    dateButton: {
        backgroundColor: theme.colors.LightGray,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 10,
        marginLeft: 20,
        elevation: 1,
    },
    doneButton: {
        backgroundColor: theme.colors.black,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 5,
        marginTop: 20,
        marginLeft: 230,
        marginRight: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#333',
        fontSize: fontSizes.medium,
        fontFamily: fonts.regular
    },
    doneButtonText: {
        color: 'white',
        fontSize: fontSizes.large,
        fontFamily: fonts.regular
    }
});

export default DateRangePicker;
