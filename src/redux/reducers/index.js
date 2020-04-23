import {combineReducers} from 'redux';
import signUpReducer from './signUpReducer';
import signInReducer from './signInReducer';
import findPasswordReducer from './findPasswordReducer';
import liveMainGetReducer from './liveMainGetReducer';
const rootReducer = combineReducers({
  signUpReducer,
  signInReducer,
  findPasswordReducer,
  liveMainGetReducer,
});
export default rootReducer;
