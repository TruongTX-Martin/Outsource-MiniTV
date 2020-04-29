import createReducer from './createReducer';
import * as Types from '../actions/types';

const initialState = {
  isSuccess: false,
  loading: false,
};

const deleteAccountReducer = createReducer(initialState, {
  [Types.DELETE_ACCOUNT_START](state) {
    return {
      ...state,
      loading: true,
      isSuccess: false,
    };
  },
  [Types.DELETE_ACCOUNT_SUCCESS](state, action) {
    return {
      ...state,
      isSuccess: true,
      loading: false,
    };
  },
  [Types.DELETE_ACCOUNT_FAILED](state, action) {
    return {
      ...state,
      isSuccess: false,
      loading: false,
    };
  },
});
export default deleteAccountReducer;
