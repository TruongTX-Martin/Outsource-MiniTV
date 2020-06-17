import { combineReducers } from 'redux';
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
import updateProfileReducer from './updateProfileReducer';
import updateProfileImageReducer from './updateProfileImageReducer';
import deleteAccountReducer from './deleteAccountReducer';
import pokeChannelReducer from './pokeChannelReducer';
import pokeChannelReducer2 from './pokeChannelReducer2';
import getPokeListReducer from './getPokeListReducer';
import channelGetListReducer from './channelGetListReducer';
import channelGetDetailReducer from './channelGetDetailReducer';
import generateAccessTokenReducer from './generateAccessTokenReducer';

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
  updateProfileReducer,
  updateProfileImageReducer,
  deleteAccountReducer,
  pokeChannelReducer,
  getPokeListReducer,
  channelGetListReducer,
  channelGetDetailReducer,
  pokeChannelReducer2,
  generateAccessTokenReducer,
});
export default rootReducer;
