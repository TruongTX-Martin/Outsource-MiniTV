import createReducer from './createReducer';
import * as Types from '../actions/types';

const initialState = {
  onAir: null,
  todayList: [],
  hotLists: [],
  loading: false,
  resultPlay: null,
};

const liveMainGetReducer = createReducer(initialState, {
  [Types.LIVE_MAIN_START](state) {
    return {
      ...state,
      loading: true,
    };
  },
  [Types.LIVE_MAIN_SUCCESS](state, action) {
    return {
      ...state,
      loading: false,
      onAir: action.data.on_air,
      todayList: action.data.today_list,
      hotLists: action.data.hot_list,
      resultPlay: action.resultPlay,
    };
  },
  [Types.LIVE_MAIN_FAILED](state, action) {
    return {
      ...state,
      loading: false,
      onAir: null,
      todayList: [],
      hotLists: [],
    };
  },
});
export default liveMainGetReducer;
