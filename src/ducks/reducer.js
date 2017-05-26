import { combineReducers } from 'redux';
import contents from './contents';
import login from './login';
import projects from './projects';

export default combineReducers({
  contents,
  login,
  projects
});
