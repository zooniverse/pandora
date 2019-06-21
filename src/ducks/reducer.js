import { combineReducers } from 'redux';
import login from './login';
import organisation from './organisation';
import organisations from './organisations';
import project from './project';
import projects from './projects';
import resource from './resource';

export default combineReducers({
  login,
  organisation,
  organisations,
  project,
  projects,
  resource
});
