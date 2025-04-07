import { Dimensions } from "react-native";

const {height,width} = Dimensions.get('window');
export const theme={
    colors:{
     primary: '#6188EA',
     secondary: '#0047FF',
     tertiary:'#B6CAFF',
     black:'#090D20',
     black2:'#5C5F6B',
     black3:'#ADAEB5',
     white: '#FFFFFF',
     gray: '#9299AA',
     gray1:'#BEC3CF',
     gray2:'#DFE1E7',
     LightGray:'#F4F3FB',
     bookColor:'#5948a0',
     buttonColor:'#3553E6',
     bgColor:'#f5f5f5',
     purple:'#907FFB',
     "approved":'#0047FF',
     "rejected":'#9299AA',
     "pending":'#907FFB',
     PRIMARY: '#FFE70A',
     PRIMARY_NORMAL: '#5773FF',
     PRIMARY_PRESSED: '#3553E6',
     PRIMARY_DISABLED: '#ACBAFF',
     PRIMARY_BASIC: '#3E82F7',
     PRIMARY_RED: '#E04646',
   },
};

export const fonts = {
  regular: 'PlusJakartaSans-Regular',
  bold: 'PlusJakartaSans-Bold',
  medium:'PlusJakartaSans-Medium',
  semibold:'PlusJakartaSans-SemiBold'
};

export const styleFonts = {
  regular: 'DancingScript-Regular',
  bold: 'DancingScript-Bold',
  medium:'DancingScript-Medium',
  semibold:'DancingScript-SemiBold'
}

export const fontSizes = {
  small: 12,
  medium: 14,
  large: 16,
  extraSmall: 10,
  extraLarge: 18,
  max: 24
};

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
};

export const borderRadius = {
  small: 4,
  medium: 8,
  large: 12,
};

export const shadows = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};


export const lineHeight = {
  large : 20 
}

export const fontSize = {
  max: {
    size: 32,
    lineHeight: 36
  },
  xxxLarge: {
    size: 26,
    lineHeight: 28
  },
  xxLarge: {
    size: 22,
    lineHeight: 24
  },
  xLargeV1: {
    size: 20,
    lineHeight: 28
  },
  xLarge: {
    size: 18,
    lineHeight: 26
  },
  large: {
    size: height > 1024 ? 20 : 16,
    lineHeight: height > 1024 ? 22 : 18
  },
  regular: {
    size: height > 1024 ? 18 : 14,
    lineHeight: height > 1024 ? 26 : 16
  },
  small: {
    size: height > 1024 ? 16 : 12,
    lineHeight: height > 1024 ? 18 : 16
  },
  xSmall: {
    size: height > 1024 ? 14 : 10,
    lineHeight: height > 1024 ? 16 : 12
  },
  xxSmall: {
    size: height > 1024 ? 12 : 8,
    lineHeight: height > 1024 ? 12 : 10
  }
}

export const activeOpacity = {
  default : 0.2,
  regular : 0.7,
  max : 0.9
}