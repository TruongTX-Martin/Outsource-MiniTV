import axios from 'axios';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Constants from '../../config/Constant';
import DataLocal from '../DataLocal';
import RNFetchBlob from 'rn-fetch-blob';
import { EventRegister } from 'react-native-event-listeners';

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  },
};

let tokenFirebase = '';

axios.interceptors.response.use(
  (response) => {
    checkResponse();
    return response;
  },
  (error) => {
    if (error.response.status == 401) {
      EventRegister.emit(Constants.EVENT_SIGN_OUT);
    }
    console.log('Interceptors error:', error);
    console.log('Interceptors error code:', error.response.status);
    console.log(JSON.stringify(error));
  },
);

const checkResponse = () => {
  // EventRegister.emitEvent('TokenExpired');
};

const get = async (path, params) => {
  const data = await axios.get(path, params, axiosConfig);
  return data;
};

const generateAccessToken = async () => {
  const params = {};
  params.app_udid = DeviceInfo.getUniqueId();
  params.model = DeviceInfo.getModel();
  params.os_name = Platform.OS;
  params.os_ver = DeviceInfo.getSystemVersion();
  params.app_ver = Constants.VERSION_APP;
  params.push_token = tokenFirebase;
  return await axios.post('/auth/access-token', params, {
    headers: {
      'X-Access-Id': Constants.KEY_ACCESS_ID,
      'X-Secret-Key': Constants.KEY_SECRET,
      'Content-Type': 'application/json',
    },
  });
};

const signUp = async (params) => {
  const accessToken = await DataLocal.getAccessToken();
  return await axios.post('/auth/registration', params, {
    headers: {
      'X-Access-Token': accessToken,
      'Content-Type': 'application/json',
    },
  });
};

const signIn = async (params) => {
  const accessToken = await DataLocal.getAccessToken();
  return await axios.post('/auth/user-token', params, {
    headers: {
      'X-Access-Token': accessToken,
      'Content-Type': 'application/json',
    },
  });
};

const snsSignIn = async (params) => {
  const accessToken = await DataLocal.getAccessToken();
  return await axios.post('/auth/sns-signin', params, {
    headers: {
      'X-Access-Token': accessToken,
      'Content-Type': 'application/json',
    },
  });
};

const updatePushAlert = async (params) => {
  const accessToken = await DataLocal.getAccessToken();
  return await axios.post('/auth/push/callback-available', params, {
    headers: {
      'X-Access-Token': accessToken,
      'Content-Type': 'application/json',
    },
  });
};

const findPassword = async (email) => {
  const accessToken = await DataLocal.getAccessToken();
  return await axios.get('/auth/find-password', {
    headers: {
      'X-Access-Token': accessToken,
      'X-User-Email': email,
    },
  });
};

const getMainLive = async () => {
  const accessToken = await DataLocal.getAccessToken();
  const userToken = await DataLocal.getUserToken();
  return await axios.get('/live/main', {
    headers: {
      'X-Access-Token': accessToken,
      'X-User-Token': userToken,
    },
  });
};

const getPlayUrl = async (liveId) => {
  const userToken = await DataLocal.getUserToken();
  return await axios.get(`/live/enter-class/${liveId}`, {
    headers: {
      'X-User-Token': userToken,
    },
  });
};

const getDetail = async (id) => {
  const accessToken = await DataLocal.getAccessToken();
  const userToken = await DataLocal.getUserToken();
  return await axios.get(`/live/${id}`, {
    headers: {
      'X-Access-Token': accessToken,
      'X-User-Token': userToken,
    },
  });
};

const getListNotice = async () => {
  const userToken = await DataLocal.getUserToken();
  return await axios.get('/mypage/notice', {
    headers: {
      'X-User-Token': userToken,
    },
  });
};

const getListReplay = async () => {
  const userToken = await DataLocal.getUserToken();
  return await axios.get('/live/review-list', {
    headers: {
      'X-User-Token': userToken,
    },
  });
};

const getPokeList = async () => {
  const userToken = await DataLocal.getUserToken();
  return await axios.get('/live/wish-list', {
    headers: {
      'X-User-Token': userToken,
    },
  });
};

const changePassword = async (params) => {
  const userToken = await DataLocal.getUserToken();
  return await axios.post('/mypage/change-password', params, {
    headers: {
      'X-User-Token': userToken,
      'Content-Type': 'application/json',
    },
  });
};

const getMe = async () => {
  const userToken = await DataLocal.getUserToken();
  return await axios.get('/mypage/member-account', {
    headers: {
      'X-User-Token': userToken,
    },
  });
};

const updateProfile = async (params) => {
  const userToken = await DataLocal.getUserToken();
  return await axios.post('/mypage/member-account', params, {
    headers: {
      'X-User-Token': userToken,
      'Content-Type': 'application/json',
    },
  });
};

const updateProfileImage = async (params) => {
  const userToken = await DataLocal.getUserToken();
  return RNFetchBlob.fetch(
    'POST',
    Constants.BASE_URL + '/mypage/change-image',
    {
      'X-User-Token': userToken,
      'Content-Type': 'multipart/form-data',
    },
    params,
  );
};

const deleteAccount = async (params) => {
  const userToken = await DataLocal.getUserToken();
  return await axios.post('/mypage/cancel-membership', params, {
    headers: {
      'X-User-Token': userToken,
      'Content-Type': 'application/json',
    },
  });
};

const pokeChannel = async (liveId, params) => {
  const userToken = await DataLocal.getUserToken();
  return await axios.post(`/live/wish/${liveId}`, params, {
    headers: {
      'X-User-Token': userToken,
      'Content-Type': 'application/json',
    },
  });
};

const pokeChannel2 = async (channelId, params) => {
  const userToken = await DataLocal.getUserToken();
  return await axios.post(`/channel/wish/${channelId}`, params, {
    headers: {
      'X-User-Token': userToken,
      'Content-Type': 'application/json',
    },
  });
};

const validateEmail = async (email) => {
  const accessToken = await DataLocal.getAccessToken();
  return await axios.get('/auth/validate-email', {
    headers: {
      'X-Access-Token': accessToken,
      'X-User-Email': email,
    },
  });
};

const setTokenFirebase = (token) => {
  tokenFirebase = token;
};

const getChannelList = async () => {
  const accessToken = await DataLocal.getAccessToken();
  const userToken = await DataLocal.getUserToken();
  return await axios.get('/channel/list', {
    headers: {
      'X-Access-Token': accessToken,
      'X-User-Token': userToken,
    },
  });
};

const getChannelDetail = async (id) => {
  const accessToken = await DataLocal.getAccessToken();
  const userToken = await DataLocal.getUserToken();
  return await axios.get('/channel/' + id, {
    headers: {
      'X-Access-Token': accessToken,
      'X-User-Token': userToken,
    },
  });
};

const authPhone = async (params) => {
  const accessToken = await DataLocal.getAccessToken();
  return await axios.post('/auth/phone-number', params, {
    headers: {
      'X-Access-Token': accessToken,
      'Content-Type': 'application/json',
    },
  });
};

export default {
  generateAccessToken,
  signUp,
  signIn,
  snsSignIn,
  findPassword,
  getMainLive,
  getListNotice,
  getListReplay,
  getDetail,
  changePassword,
  getMe,
  updateProfile,
  updateProfileImage,
  deleteAccount,
  pokeChannel,
  getPokeList,
  getPlayUrl,
  validateEmail,
  setTokenFirebase,
  getChannelList,
  getChannelDetail,
  pokeChannel2,
  updatePushAlert,
  authPhone,
};
