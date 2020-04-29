import {combineReducers} from 'redux';
import signUpReducer from './signUpReducer';
import signInReducer from './signInReducer';
import findPasswordReducer from './findPasswordReducer';
import liveMainGetReducer from './liveMainGetReducer';
import liveNoticeGetReducer from './liveNoticeGetReducer';
import liveReplayGetReducer from './liveReplayGetReducer';
import liveDetailReducer from './liveDetailReducer';
import snsSignInReducer from './snsSignInReducer';
import changePasswordReducer from './changePasswordReducer';
import getMeReducers from './getMeReducers';
const rootReducer = combineReducers({
  signUpReducer,
  signInReducer,
  findPasswordReducer,
  liveMainGetReducer,
  liveNoticeGetReducer,
  liveReplayGetReducer,
  liveDetailReducer,
  snsSignInReducer,
  changePasswordReducer,
  getMeReducers,
});
export default rootReducer;
