import React, { useEffect, useRef } from 'react';
import { Animated, View, Text } from 'react-native';
import { fonts, theme } from '../theme/theme';

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
    <View style={{marginTop:40,}}>
      {lines.map((line, lineIndex) => (
        <Animated.View key={lineIndex} style={{ flexDirection: 'row', opacity: animatedValues[lineIndex][0] }}>
          {line.split('').map((letter, index) => (
            <Animated.Text
              key={index}
              style={{
                opacity: animatedValues[lineIndex][index],
                fontFamily: fonts.bold,
                fontSize: 30,
                color: index === 0? '#001f8b' : theme.colors.black,
              }}
            >
              {letter}
            </Animated.Text>
          ))}
        </Animated.View>
      ))}
    </View>
  );
};

export default AnimatedTextLines;
