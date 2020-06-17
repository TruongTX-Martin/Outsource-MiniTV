import createReducer from './createReducer';
import * as Types from '../actions/types';

const initialState = {
  push_callback_available: true,
};

const generateAccessTokenReducer = createReducer(initialState, {
  [Types.GENERATE_ACCESS_TOKEN_START](state) {
    return {
      ...state,
    };
  },
  [Types.GENERATE_ACCESS_TOKEN_SUCCESS](state, action) {
    return {
      ...state,
      push_callback_available: action.data.push_callback_available,
    };
  },
  [Types.GENERATE_ACCESS_TOKEN_FAILED](state, action) {
    return {
      ...state,
    };
  },
});
export default generateAccessTokenReducer;
