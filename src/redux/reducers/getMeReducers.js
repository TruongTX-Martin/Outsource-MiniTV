import createReducer from './createReducer';
import * as Types from '../actions/types';

const initialState = {
  loadingMe: false,
  meData: null,
};

const getMeReducers = createReducer(initialState, {
  [Types.GET_ME](state) {
    return {
      ...state,
      loadingMe: true,
    };
  },
  [Types.GET_ME_SUCCESS](state, action) {
    return {
      ...state,
      loadingMe: false,
      meData: action.meData,
    };
  },
  [Types.GET_ME_FAILED](state, action) {
    return {
      ...state,
      loadingMe: false,
    };
  },
  [Types.GET_ME_CLEAR](state, action) {
    return {
      ...state,
      loadingMe: false,
      meData: null,
    };
  },
});
export default getMeReducers;
