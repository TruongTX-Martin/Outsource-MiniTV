import {combineReducers} from 'redux';
import signUpReducer from './signUpReducer';
import signInReducer from './signInReducer';
import findPasswordReducer from './findPasswordReducer';
const rootReducer = combineReducers({
  signUpReducer,
  signInReducer,
  findPasswordReducer,
});
export default rootReducer;
