import * as React from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import RenderChart from '../../Screens/renderLegendComponent';

const DynamicHeader = ({animHeaderValue}) => {
    const Max_Header_Height = 0;
    const Min_Header_Height = -250;
    const Scroll_Distance = Max_Header_Height - Min_Header_Height
    const animatedHeaderHeight =  animHeaderValue.interpolate({
        inputRange: [0, Scroll_Distance],
        outputRange: [Max_Header_Height , Min_Header_Height],
        extrapolate: 'clamp'
    })
    return (
        <Animated.View 
        style={[
          styles.header,
          {
            transform: [{translateY : animatedHeaderHeight}],
          }

        ]}
        >
            <RenderChart />   
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    header: {
      justifyContent: 'center',
      alignItems: 'center',      
      left: 0,
      right: 0,
      paddingTop: 10
    },
    headerText: {
      color: '#fff',
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center'
    },
  });

export default DynamicHeader;