import Toast from 'react-native-toast-message';

export const showToast = () => {
    Toast.show({
    type: 'tomatoToast',
    text1: 'Copied...',
    position: 'bottom',
    visibilityTime:800,
    });
  }