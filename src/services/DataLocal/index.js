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

export default {
  setHasShowIntro,
  getHasShowIntro,
};
