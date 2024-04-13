import { StyleSheet, Text, TouchableOpacity ,View} from 'react-native'
import React,{memo} from 'react'
import { fonts, fontSizes, theme } from '../../theme/theme'

const ThreeDDot = ({ color }) => {
  return (
    <View >
      <View style={[styles.dot, { backgroundColor: color }]} />
    </View>
  );
};

const RenderButtonList = ({item,handleButtonPress,selectedButton}) => {
  
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: selectedButton? theme.colors.tertiary : theme.colors.LightGray }]}
      onPress={() => handleButtonPress(item?.label)}
    >
      <ThreeDDot color={item?.color} />
      <Text style={styles.buttonText}>{item?.name}</Text>
    </TouchableOpacity>
  )
}

export default memo(RenderButtonList)

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    marginBottom:5,
  },
  buttonText: {
    color: theme.colors.black,
    fontFamily: fonts.bold,
    lineHeight:19,
    fontSize:fontSizes.medium,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 7,
    marginRight: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

