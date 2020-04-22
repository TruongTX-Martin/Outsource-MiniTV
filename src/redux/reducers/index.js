import {combineReducers} from 'redux';
import listDataReducer from './listDataReducer';
import signUpReducer from './signUpReducer';

const rootReducer = combineReducers({
  listDataReducer,
  signUpReducer,
});
export default rootReducer;
