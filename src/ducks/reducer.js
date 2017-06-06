import { combineReducers } from 'redux';
import contents from './contents';
import login from './login';
import projects from './projects';
import resource from './resource';

export default combineReducers({
  contents,
  login,
  projects,
  resource
});
