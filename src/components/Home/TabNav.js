import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Image } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { fonts, theme } from '../../theme/theme';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
const Tab = ({ title, isActive, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.tab, { borderColor: isActive ? theme.colors.secondary : theme.colors.gray, flex: isActive ? 2 : 1 }]}>
      <Text numberOfLines={1} style={[styles.tabText, { color: isActive ? theme.colors.secondary : theme.colors.gray }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const Item = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: 'https://dummyimage.com/600x400/000/fff' }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.uniqueName}</Text>
        <Text style={styles.itemSubtitle}>{item.entryDate}</Text>
      </View>
      <Text style={styles.itemAmount}>₹{item.amount}</Text>
    </View>
  );
};

const TabSwitcher = () => {
  const dispatch = useDispatch();
  const date = useSelector(state => state?.date);
  const { startDate, endDate } = date;
  const expenseList = useSelector(state => state?.expenses?.expenses);
  const [activeTab, setActiveTab] = useState(0);
  const flatListRef = useRef(null);
  const companies = useSelector(state => state?.company?.index);
  const user = useSelector(state => state?.auth?.user);
  useEffect(() => {
    dispatch({ type: 'expenses/fetchExpensesRequest', payload: { uniqueName: companies?.uniqueName, sessionId: user?.session?.id } })

  }, []);

  const handleTabPress = (index) => {
    setActiveTab(index);
    flatListRef.current.scrollToIndex({ animated: true, index });
  };

  const handleHandlerStateChange = (event) => {
    if (event.nativeEvent.translationX !== 0 && Math.abs(event.nativeEvent.translationX) > Math.abs(event.nativeEvent.translationY)) {
      if (event.nativeEvent.translationX > 0 && activeTab > 0) {
        setActiveTab(activeTab - 1);
      } else if (event.nativeEvent.translationX < 0 && activeTab < 2) {
        setActiveTab(activeTab + 1);
      }
    }
    if (event.nativeEvent.state === State.END) {
      if (activeTab !== -1) {
        flatListRef.current.scrollToIndex({ animated: true, index: activeTab });
      }
    }
  };

  const pendingOrRejected = expenseList.pendingOrRejected.filter(item => {
    const itemDate = item.entryDate;
    const reversedStartDate = itemDate.split('-').reverse().join('-');
    return reversedStartDate >= new Date(startDate)?.toISOString().split('T')[0] && reversedStartDate <= new Date(endDate)?.toISOString().split('T')[0];
  });
  const approved = expenseList.approved.filter(item => {
    const itemDate = item.entryDate;
    const reversedStartDate = itemDate.split('-').reverse().join('-');
    return reversedStartDate >= new Date(startDate)?.toISOString().split('T')[0] && reversedStartDate <= new Date(endDate)?.toISOString().split('T')[0];
  });
  const allRequests = expenseList.allRequests.filter(item => {
    const itemDate = item.entryDate;
    const reversedStartDate = itemDate.split('-').reverse().join('-');
    return reversedStartDate >= new Date(startDate)?.toISOString().split('T')[0] && reversedStartDate <= new Date(endDate)?.toISOString().split('T')[0];
  });
  console.log(startDate)
  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {['Pending/Rejected', 'Approved', 'All Requests'].map((tab, index) => (
          <Tab
            key={index}
            title={tab}
            isActive={index === activeTab}
            onPress={() => handleTabPress(index)}
          />
        ))}
      </View>
      <PanGestureHandler
        onHandlerStateChange={handleHandlerStateChange}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            ref={flatListRef}
            data={activeTab == 0 ? pendingOrRejected : activeTab == 1 ? approved : allRequests}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.uniqueName}
          />
        </View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgColor,
    marginTop: 5,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tab: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 110,
    marginLeft: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 0,
  },
  tabText: {
    fontFamily: fonts.regular,
    marginHorizontal: 2,
    textAlign: 'center',
  },
  itemContainer: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
    marginLeft: 10,
  },
  itemDetails: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  itemSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: theme.colors.gray,
  },
  itemAmount: {
    fontFamily: fonts.regular,
    fontSize: 16,
    paddingHorizontal: 10,
  },
});

export default TabSwitcher;
