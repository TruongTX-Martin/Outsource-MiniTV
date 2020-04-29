import createReducer from './createReducer';
import * as Types from '../actions/types';

const initialState = {
  isUpdatingImage: false,
};

const updateProfileImageReducer = createReducer(initialState, {
  [Types.UPDATE_IMAGE_PROFILE_START](state) {
    return {
      ...state,
      isUpdatingImage: true,
    };
  },
  [Types.UPDATE_IMAGE_PROFILE_FAILED](state, action) {
    return {
      ...state,
      isUpdatingImage: false,
    };
  },
  [Types.UPDATE_IMAGE_PROFILE_SUCCESS](state, action) {
    return {
      ...state,
      isUpdatingImage: false,
    };
  },
});
export default updateProfileImageReducer;
