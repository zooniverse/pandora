import { combineReducers } from 'redux';
import contents from './contents';
import login from './login';

export default combineReducers({
  contents,
  login,
});
