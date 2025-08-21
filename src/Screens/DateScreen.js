import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, StatusBar, Dimensions } from 'react-native';
import { PanGestureHandler, ScrollView, State } from 'react-native-gesture-handler';
import DateRangePicker from '../components/Date/Custom';
import PeriodListComponent from '../components/Date/Period';
import { activeOpacity, borderRadius, fonts, fontSize, fontSizes, lineHeight, spacing, theme } from '../theme/theme';

const {height,width} = Dimensions.get('window');
const Item = ({ item, selectedIndex,setStartDate,setEndDate,bottomSheetModalRef,selectedDateRange,setSelectedDateRange,prevStartDate,prevEndDate }) => {
    if(item === 'Period' && selectedIndex === 0) return <View style={{width:width}}><PeriodListComponent bottomSheetModalRef={bottomSheetModalRef} setStartDate={setStartDate} setEndDate={setEndDate} selectedDateRange={selectedDateRange} setSelectedDateRange={setSelectedDateRange} prevStartDate={prevStartDate} prevEndDate={prevEndDate}/></View>
    else if(item === 'Custom' && selectedIndex === 1)return <View style={{width:width}}><DateRangePicker bottomSheetModalRef={bottomSheetModalRef} setEndDate={setEndDate} setStartDate={setStartDate} setSelectedDateRange={setSelectedDateRange} prevStartDate={prevStartDate} prevEndDate={prevEndDate}/></View>
};

const routes = ['Period', 'Custom'];

const DateScreen = ({setStartDate,setEndDate,bottomSheetModalRef,selectedDateRange,setSelectedDateRange,prevStartDate,prevEndDate}) => {
    const [index, setIndex] = useState(0);
    const flatListRef = useRef(null);

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
            <View style={styles.tabBarContainer}>
                {routes.map((route, i) => (
                    <TouchableOpacity
                        key={route}
                        style={[styles.tab, i === index && styles.selectedTab]}
                        activeOpacity={activeOpacity.regular}
                        onPress={() => handleTabPress(i)}
                    >
                        <Text style={[styles.tabText, i === index && styles.selectedTabText]}>{route}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <PanGestureHandler
                onHandlerStateChange={handleGestureStateChange}

            >
                {/* <ScrollView
                    horizontal={true} 
                    style={styles.sceneContainer}
                    showsHorizontalScrollIndicator={false}
                >
                {
                    routes.map((route,i)=>{
                        return <Item key={route} bottomSheetModalRef={bottomSheetModalRef} setStartDate={setStartDate} setEndDate={setEndDate} item={route} selectedIndex={i} />
                    })
                }    
                </ScrollView> */}
                
                    <FlatList
                        ref={flatListRef}
                        data={routes}
                        horizontal={true}
                        renderItem={({ item }) => <Item 
                            bottomSheetModalRef={bottomSheetModalRef} 
                            setStartDate={setStartDate} 
                            setEndDate={setEndDate} 
                            item={item} 
                            selectedIndex={index} 
                            selectedDateRange={selectedDateRange} 
                            setSelectedDateRange={setSelectedDateRange}
                            prevStartDate={prevStartDate}
                            prevEndDate={prevEndDate}
                        />}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item}
                    />
            </PanGestureHandler>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
        alignItems:'center',
        backgroundColor: theme.colors.white
    },
    tabBarContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: theme.colors.white,
        marginVertical: 10,
        overflow: 'hidden',
        paddingHorizontal:20,
        paddingVertical:3
    },
    tab: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        marginHorizontal:10,
        height:50,
        borderRadius:50,
        borderColor: theme.colors.white,
        backgroundColor: theme.colors.LightGray,
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
        fontSize: fontSize.large.size,
        fontFamily:fonts.medium,
        lineHeight: fontSize.large.lineHeight
    },
    selectedTabText: {
        color: theme.colors.secondary,
        fontFamily:fonts.regular,
        lineHeight: lineHeight.large
    },
    sceneContainer: {
        flex: 1,
        borderWidth:2,
    },
});

export default DateScreen;
