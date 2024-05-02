import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { activeOpacity, fonts, fontSize, fontSizes, lineHeight } from '../../theme/theme';

const PeriodListComponent = ({ setStartDate, setEndDate,bottomSheetModalRef }) => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  
  const reverseDateFormat = (dateStr) =>{
    const parts = dateStr.split('-');
    const reversedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return reversedDate;
  }
  const calculateQuarterStartDate = () => {
  const quarterStartMonth = Math.floor((currentMonth - 1) / 3)-1;
  const startDate = new Date(today.getFullYear(), quarterStartMonth, 1);
  return formatDate(startDate);
};

  const calculateStartDate = (monthsAgo) => {
    const startDate = new Date(today.getFullYear(), today.getMonth() - monthsAgo, 1);
    return formatDate(startDate);
  };

  const calculateEndDate = (monthsAgo) => {
    const today = new Date();
    let endDate;

    if (monthsAgo) {
      const tempDate = new Date(today);
      tempDate.setMonth(tempDate.getMonth() - monthsAgo+1);
      tempDate.setDate(0);
      endDate = tempDate;
    } else {
      endDate = today;
    }

    return formatDate(endDate);

  };

  const calculateLastQuarterStartDate = () => {
  const currentQuarterStartMonth = Math.floor((currentMonth - 1) / 3) * 3 -1;
  const lastQuarterStartMonth = currentQuarterStartMonth - 4 < 0 ? 8: currentQuarterStartMonth - 4;
  const lastQuarterYear = lastQuarterStartMonth <= currentMonth ? today.getFullYear() : today.getFullYear() - 1;
  const startDate = new Date(lastQuarterYear, lastQuarterStartMonth , 1);
  return formatDate(startDate);
};

const calculateLastQuarterEndDate = () => {
  const lastQuarterStartDate = calculateLastQuarterStartDate();
  // const endDate = new Date(lastQuarterStartDate);
  const reverseDate = reverseDateFormat(lastQuarterStartDate)
  const endDate = new Date(reverseDate);
  endDate.setMonth(endDate.getMonth() + 3);
  endDate.setDate(endDate.getDate() - 1);
  return formatDate(endDate);
};

const calculateFinancialYearStartDate = () => {
  const financialYearStartMonth = 1;
  const startDate = new Date(today.getFullYear(), financialYearStartMonth - 1, 1);
  return formatDate(startDate);
};

const calculateFinancialYearEndDate = () => {
  return formatDate(today);
};


  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  };

  const PeriodList = [
    { id: 1, name: 'This Month', startDate: calculateStartDate(0), endDate: calculateEndDate(0) },
    { id: 2, name: 'Last Month', startDate: calculateStartDate(1), endDate: calculateEndDate(1) },
    { id: 3, name: 'This Quarter to Date', startDate: calculateQuarterStartDate(), endDate: calculateEndDate(0) },
    { id: 4, name: 'Last Quarter', startDate: calculateLastQuarterStartDate(), endDate: calculateLastQuarterEndDate() },
    { id: 5, name: 'This Financial Year to Date', startDate: calculateFinancialYearStartDate(), endDate: calculateFinancialYearEndDate() },
  ];

  const handlePeriodSelection = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    bottomSheetModalRef?.current?.dismiss();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={activeOpacity.regular}
      onPress={() => handlePeriodSelection(item.startDate, item.endDate)}
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={PeriodList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft:10,
    marginBottom: 10,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  itemText: {
    fontSize: fontSize.regular.size,
    color: 'black',
    fontFamily: fonts.regular,
    lineHeight: fontSize.regular.lineHeight
  },
});

export default PeriodListComponent;
