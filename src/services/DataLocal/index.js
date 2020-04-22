import {AsyncStorage} from 'react-native';
import Constants from '../../config/Constant';

const setHasShowIntro = (hasShow) => {
  try {
    AsyncStorage.setItem(Constants.SHOW_INTRO, hasShow);
  } catch (error) {}
};
const getHasShowIntro = async () => {
  const hasShow = await AsyncStorage.getItem(Constants.SHOW_INTRO);
  return hasShow;
};

const setAccessToken = (accessToken) => {
  try {
    AsyncStorage.setItem(Constants.ACCESS_TOKEN, accessToken);
  } catch (error) {}
};
const getAccessToken = async () => {
  const accessToken = await AsyncStorage.getItem(Constants.ACCESS_TOKEN);
  return accessToken;
};

const setUserToken = (userToken) => {
  try {
    AsyncStorage.setItem(Constants.USER_TOKEN, userToken);
  } catch (error) {}
};
const getUserToken = async () => {
  const userToken = await AsyncStorage.getItem(Constants.USER_TOKEN);
  return userToken;
};

export default {
  setHasShowIntro,
  getHasShowIntro,
  setAccessToken,
  getAccessToken,
  setUserToken,
  getUserToken,
};
