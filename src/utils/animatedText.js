import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { fontSize, fonts, theme } from '../theme/theme';

const AnimatedTextLines = ({ lines }) => {
  const animatedValues = useRef(lines.map(line => line.split('').map(() => new Animated.Value(0)))).current;

  useEffect(() => {
    const animations = animatedValues.map(lineValues =>
      lineValues.map((animatedValue, index) =>
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 15,
          delay: 10 * index,
          useNativeDriver: true,
        })
      )
    );

    const loopedAnimations = Animated.loop(
      Animated.sequence([
        Animated.stagger(100, animations.flat()),
        Animated.delay(2000),
      ]),
      { iterations: -1 }
    );

    loopedAnimations.start();
  }, []);

  return (
    <View style={styles.container}>
      {lines.map((line, lineIndex) => (
        <Animated.View key={lineIndex} style={{ flexDirection: 'row', opacity: animatedValues[lineIndex][0] }}>
          {line.split('').map((letter, index) => (
            <Animated.Text
              key={index}
              style={styles.animatedText}
            >
              {letter}
            </Animated.Text>
          ))}
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container :{
    marginTop:40
  },
  animatedText : {
    opacity: animatedValues[lineIndex][index],
    fontFamily: fonts.bold,
    fontSize: fontSize.max.size,
    lineHeight:fontSize.max.lineHeight,
    color: index === 0? '#001f8b' : theme.colors.black,
  }
})
export default AnimatedTextLines;
