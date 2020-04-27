import Toast from 'react-native-simple-toast';

export const showToast = (message) => {
  Toast.showWithGravity(message, Toast.LONG, Toast.CENTER);
};
