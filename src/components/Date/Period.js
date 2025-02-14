import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { activeOpacity, fonts, fontSize, fontSizes, lineHeight } from '../../theme/theme';
import { resetExpenses } from '../../redux/expense/ExpenseSlice';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../interceptor';
import moment from 'moment';

const PeriodListComponent = ({ setStartDate, setEndDate,bottomSheetModalRef }) => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const dispatch = useDispatch();
  const companyUniqueName = useSelector(state => state?.company?.selectedCompany?.uniqueName);
  const [currentFinancialYearStartDate, setCurrentFinancialYearStartDate] = useState("");
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

  const getFinancialYear  = async () => {
    try {
      const apiUrl = `company/${companyUniqueName}/financial-year?lang=en`;
      const response = await api.get(apiUrl);
      if( response?.data.status === 'success' && response?.data?.body?.financialYears ) {
        let currentFinancialYearStartDate;
        const todayDate = moment().startOf('day').format('DD-MM-YYYY');
        
        response?.data?.body?.financialYears?.forEach((item: any) => {
          if (moment(todayDate, 'DD-MM-YYYY').isAfter(moment(item?.financialYearStarts, 'DD-MM-YYYY')) && moment(todayDate, 'DD-MM-YYYY').isBefore(moment(item.financialYearEnds, 'DD-MM-YYYY'))) {
            currentFinancialYearStartDate = item.financialYearStarts;
          }
        })
        setCurrentFinancialYearStartDate(currentFinancialYearStartDate);
      }
    } catch (error) {
      console.error('------ getFinancialYear -----', error)
      const financialYearStartMonth = 1;
      const startDate = new Date(today.getFullYear(), financialYearStartMonth - 1, 1);
      setCurrentFinancialYearStartDate(formatDate(startDate));
    }
  }

  useEffect(()=>{
    getFinancialYear();
  },[])

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
    { id: 1, name: 'This Month'},
    { id: 2, name: 'Last Month'},
    { id: 3, name: 'This Quarter to Date'},
    { id: 4, name: 'Last Quarter'},
    { id: 5, name: 'This Financial Year to Date'}
  ];

  const handlePeriodSelection = (startDate, endDate) => {
    dispatch(resetExpenses());
    setStartDate(startDate);
    setEndDate(endDate);
    bottomSheetModalRef?.current?.dismiss();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={activeOpacity.regular}
      onPress={() => {
        setSelectedDateRange({...item});
        if(item?.id == 1){
          handlePeriodSelection(calculateStartDate(0), calculateEndDate(0));
        }else if(item?.id == 2){
          handlePeriodSelection(calculateStartDate(1), calculateEndDate(1));
        }else if(item?.id == 3){
          handlePeriodSelection(calculateQuarterStartDate, calculateEndDate(0));
        }else if(item?.id == 4){
          handlePeriodSelection(calculateLastQuarterStartDate(), calculateLastQuarterEndDate());
        }else if(item?.id == 5){
          handlePeriodSelection(currentFinancialYearStartDate, calculateFinancialYearEndDate())
        }
        }
      }
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
