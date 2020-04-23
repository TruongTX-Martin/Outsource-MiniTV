import {combineReducers} from 'redux';
import signUpReducer from './signUpReducer';
import signInReducer from './signInReducer';
import findPasswordReducer from './findPasswordReducer';
import liveMainGetReducer from './liveMainGetReducer';
import liveNoticeGetReducer from './liveNoticeGetReducer';
import liveReplayGetReducer from './liveReplayGetReducer';
const rootReducer = combineReducers({
  signUpReducer,
  signInReducer,
  findPasswordReducer,
  liveMainGetReducer,
  liveNoticeGetReducer,
  liveReplayGetReducer,
});
export default rootReducer;
