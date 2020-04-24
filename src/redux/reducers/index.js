import {combineReducers} from 'redux';
import signUpReducer from './signUpReducer';
import signInReducer from './signInReducer';
import findPasswordReducer from './findPasswordReducer';
import liveMainGetReducer from './liveMainGetReducer';
import liveNoticeGetReducer from './liveNoticeGetReducer';
import liveReplayGetReducer from './liveReplayGetReducer';
import liveDetailReducer from './liveDetailReducer';
const rootReducer = combineReducers({
  signUpReducer,
  signInReducer,
  findPasswordReducer,
  liveMainGetReducer,
  liveNoticeGetReducer,
  liveReplayGetReducer,
  liveDetailReducer,
});
export default rootReducer;
