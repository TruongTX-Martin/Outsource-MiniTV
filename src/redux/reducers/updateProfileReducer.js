import createReducer from './createReducer';
import * as Types from '../actions/types';

const initialState = {
  isUpdateSuccess: false,
  isUpdating: false,
};

const updateProfileReducer = createReducer(initialState, {
  [Types.UPDATE_PROFILE_START](state) {
    return {
      ...state,
      isUpdateSuccess: false,
      isUpdating: true,
    };
  },
  [Types.UPDATE_PROFILE_FAILED](state, action) {
    return {
      ...state,
      isUpdateSuccess: false,
      isUpdating: false,
    };
  },
  [Types.UPDATE_PROFILE_SUCCESS](state, action) {
    return {
      ...state,
      isUpdateSuccess: true,
      isUpdating: false,
    };
  },
  [Types.UPDATE_PROFILE_CLEAR](state, action) {
    return {
      ...state,
      isUpdateSuccess: false,
      isUpdating: false,
    };
  },
});
export default updateProfileReducer;
