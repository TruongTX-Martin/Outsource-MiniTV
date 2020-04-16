import axios from 'axios';
import {put} from 'redux-saga/effects';
import * as getListDataAction from '../../redux/actions/getListDataAction';
import {EventRegister} from 'react-native-event-listeners';

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  },
};

axios.interceptors.response.use(
  (response) => {
    checkResponse();
    return response;
  },
  (error) => {
    console.log(error);
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

const getListData = async () => {
  return await get('/posts', {});
};

export default {
  getListData,
};
