import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { useSelector } from 'react-redux';
import { fontSize, fonts, theme } from '../theme/theme';

const RenderChart = () => {
  const expenses = useSelector(state => state?.expenses?.expenses);
  
  const totalAmount = expenses?.["AllRequests"]?.filter((item)=>item?.entryType !='sales')?.reduce((total, expense) => total + expense?.amount, 0);
  const pendingPercentage = (expenses?.["Pending"]?.reduce((total, expense) => total + expense?.amount, 0) / (totalAmount===0?1:totalAmount)) * 100;
  const rejectedPercentage = (expenses?.["Rejected"]?.reduce((total, expense) => total + expense?.amount, 0) / (totalAmount===0?1:totalAmount)) * 100;
  const approvedPercentage = (expenses?.["Approved"]?.reduce((total, expense) => total + expense?.amount, 0) / (totalAmount===0?1:totalAmount)) * 100;

  const pieData = [
    { value: pendingPercentage===0&&rejectedPercentage===0&&approvedPercentage===0?100:0, color: theme.colors.black, gradientCenterColor: theme.colors.secondary,},
    { value: approvedPercentage, color: theme.colors.primary, gradientCenterColor: theme.colors.secondary, focused: true },
    { value: rejectedPercentage, color: theme.colors.gray1, gradientCenterColor: theme.colors.gray },
    { value: pendingPercentage, color: theme.colors.purple, gradientCenterColor: theme.colors.tertiary },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={95}
          innerRadius={70}
          innerCircleColor={'white'}
          centerLabelComponent={() => (
            <View style={styles.centerLabel}>
              <Text style={styles.totalAmount}>
                &#8377;{totalAmount?.toFixed(2)}
              </Text>
              <Text style={styles.spending}>Spending</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: theme.colors.white,
    marginBottom: 30,
  },
  chartContainer: {
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
  },
  centerLabel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalAmount: {
    fontSize: fontSize.xLargeV1.size,
    lineHeight: fontSize.xLargeV1.lineHeight,
    color: theme.colors.black,
    fontFamily:fonts.bold,
  },
  spending: {
    fontSize: fontSize.regular.size,
    lineHeight: fontSize.regular.lineHeight,
    color: theme.colors.gray1,
    fontFamily:fonts.bold,
  },
});

export default RenderChart;
