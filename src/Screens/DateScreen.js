import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import DateRangePicker from '../components/Date/Custom';
import PeriodListComponent from '../components/Date/Period';
import { fonts, fontSizes, theme } from '../theme/theme';

const Item = ({ item, selectedIndex,setStartDate,setEndDate,bottomSheetModalRef }) => {
    return (
        <View style={{ flex: 1 }}>
            {item === 'Period' && selectedIndex === 0 && <PeriodListComponent bottomSheetModalRef={bottomSheetModalRef} setStartDate={setStartDate} setEndDate={setEndDate} />}
            {item === 'Custom' && selectedIndex === 1 && <DateRangePicker bottomSheetModalRef={bottomSheetModalRef} setEndDate={setEndDate} setStartDate={setStartDate} />}
        </View>
    );
};


const DateScreen = ({setStartDate,setEndDate,bottomSheetModalRef}) => {
    const [index, setIndex] = useState(0);
    const flatListRef = useRef(null);

    const routes = ['Period', 'Custom'];

    const handleTabPress = (i) => {
        setIndex(i);
        flatListRef.current.scrollToIndex({ animated: true, index: i });
    };

    const handleGestureStateChange = ({ nativeEvent }) => {
  const { translationX, translationY } = nativeEvent;
  const xMagnitude = Math.abs(translationX);
  const yMagnitude = Math.abs(translationY);

  if (nativeEvent.state === State.END) {
    if (yMagnitude > xMagnitude) {
      return;
    }
    if (translationX < 0 && index < routes.length - 1) {
      setIndex(index + 1);
      flatListRef.current.scrollToIndex({ animated: true, index: index + 1 });
    } else if (translationX > 0 && index > 0) {
      setIndex(index - 1);
      flatListRef.current.scrollToIndex({ animated: true, index: index - 1 });
    }
  }
};


    return (
        <View style={styles.container}>
        <StatusBar backgroundColor={theme.colors.black} />
            <View style={styles.tabBarContainer}>
                {routes.map((route, i) => (
                    <TouchableOpacity
                        key={route}
                        style={[styles.tab, i === index && styles.selectedTab]}
                        onPress={() => handleTabPress(i)}
                    >
                        <Text style={[styles.tabText, i === index && styles.selectedTabText]}>{route}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <PanGestureHandler
                onHandlerStateChange={handleGestureStateChange}
            >
                <View style={styles.sceneContainer}>
                    <FlatList
                        ref={flatListRef}
                        data={routes}
                        renderItem={({ item }) => <Item bottomSheetModalRef={bottomSheetModalRef} setStartDate={setStartDate} setEndDate={setEndDate} item={item} selectedIndex={index} />}
                        horizontal={true}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item}
                    />
                </View>
            </PanGestureHandler>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
        backgroundColor: theme.colors.white,
    },
    tabBarContainer: {
        flexDirection: 'row',
        backgroundColor: theme.colors.white,
        marginHorizontal: 20,
        marginVertical: 10,
        overflow: 'hidden',
        paddingBottom:10,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: theme.colors.white,
        backgroundColor: theme.colors.LightGray,
        marginHorizontal: 10,
        elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    },
    selectedTab: {
        backgroundColor: theme.colors.tertiary,
        borderColor: theme.colors.white,
    },
    tabText: {
        color: 'black',
        fontSize: fontSizes.large,
        fontFamily:fonts.medium
    },
    selectedTabText: {
        color: theme.colors.secondary,
        fontFamily:fonts.regular
    },
    sceneContainer: {
        flex: 1,
        marginTop: 10,
    },
});

export default DateScreen;
