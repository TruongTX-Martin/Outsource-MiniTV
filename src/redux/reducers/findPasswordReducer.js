import createReducer from './createReducer';
import * as Types from '../actions/types';

const initialState = {
  isSuccess: false,
  loading: false,
};

const findPasswordReducer = createReducer(initialState, {
  [Types.FIND_PASSWORD_START](state) {
    return {
      ...state,
      isSuccess: false,
      loading: true,
    };
  },
  [Types.FIND_PASSWORD_FAILED](state, action) {
    return {
      ...state,
      isSuccess: false,
      loading: false,
    };
  },
  [Types.FIND_PASSWORD_SUCCESS](state, action) {
    return {
      ...state,
      isSuccess: true,
      loading: false,
    };
  },
});
export default findPasswordReducer;
