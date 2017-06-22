import { combineReducers } from 'redux';
import contents from './contents';
import login from './login';
import project from './project';
import projects from './projects';
import resource from './resource';

export default combineReducers({
  contents,
  login,
  project,
  projects,
  resource
});
