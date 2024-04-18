import Toast, { ToastPosition } from 'react-native-toast-message';

function showToast(type: string = 'success', text1: string = '', text2: string = '', position: ToastPosition = 'top') {
  Toast.show({
    type: type,
    position: position,
    text1,
    text2,
    visibilityTime: 2000,
    swipeable: true,
    autoHide: true
  });
}

export const successToast = (text1: string, text2?: string) => {
  showToast('success', text1, text2);
};
export const errorToast = (text1: string, text2?: string) => {
  showToast('error', text1, text2);
};
export const infoToast = (text1: string, text2?: string) => {
  showToast('info', text1, text2);
};
