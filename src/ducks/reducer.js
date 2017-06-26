import { combineReducers } from 'redux';
import login from './login';
import project from './project';
import projects from './projects';
import resource from './resource';

export default combineReducers({
  login,
  project,
  projects,
  resource
});
