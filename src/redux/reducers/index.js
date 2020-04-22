import {combineReducers} from 'redux';
import listDataReducer from './listDataReducer';
import signUpReducer from './signUpReducer';
import signInReducer from './signInReducer';
const rootReducer = combineReducers({
  listDataReducer,
  signUpReducer,
  signInReducer,
});
export default rootReducer;
