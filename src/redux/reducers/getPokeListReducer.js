import createReducer from './createReducer';
import * as Types from '../actions/types';

const initialState = {
  loading: false,
  list: [],
};

const getPokeListReducer = createReducer(initialState, {
  [Types.POKE_LIST_START](state) {
    return {
      ...state,
      loading: true,
    };
  },
  [Types.POKE_LIST_SUCCESS](state, action) {
    return {
      ...state,
      loading: false,
      list: action.list,
    };
  },
  [Types.POKE_LIST_FAILED](state, action) {
    return {
      ...state,
      loading: false,
    };
  },
  [Types.POKE_LIST_CLEAR](state, action) {
    return {
      ...state,
      loading: null,
      list: [],
    };
  },
});
export default getPokeListReducer;
