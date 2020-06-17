import Toast from 'react-native-simple-toast';
import Dimensions from 'react-native';

let widthScreen = 0;
let heightScreen = 0;

export const setWidthScreen = (width) => {
  widthScreen = width;
};

export const setHeightScreen = (height) => {
  heightScreen = height;
};

export const getWidthScreen = () => {
  return widthScreen;
};

export const getHeightScreen = () => {
  return heightScreen;
};

export const showToast = (message) => {
  Toast.showWithGravity(message, Toast.LONG, Toast.CENTER);
};
