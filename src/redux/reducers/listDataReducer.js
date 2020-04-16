import createReducer from './createReducer';
import * as Types from '../actions/types';

const initialState = {
  listData: [],
};

const listDataReducer = createReducer(initialState, {
  [Types.GET_LISTDATA_START](state) {
    return {
      ...state,
      listData: [],
    };
  },
  [Types.GET_LISTDATA_FAILED](state, action) {
    return {
      ...state,
      listData: [],
    };
  },
  [Types.GET_LISTDATA_SUCCESS](state, action) {
    return {
      ...state,
      listData: action.list,
    };
  },
});
export default listDataReducer;
