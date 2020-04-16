import {combineReducers} from 'redux';
import listDataReducer from './listDataReducer';

const rootReducer = combineReducers({
  listDataReducer,
});
export default rootReducer;
