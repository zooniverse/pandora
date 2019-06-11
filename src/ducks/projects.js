import apiClient from 'panoptes-client/lib/api-client';

const ALLOWED_ROLES = ['owner', 'collaborator', 'translator'];

// Action Types
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_ERROR = 'FETCH_PROJECTS_ERROR';

// Reducer
const initialState = {
  data: [],
  error: false,
  loading: false
};

function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROJECTS:
      return Object.assign({}, initialState, { loading: true });
    case FETCH_PROJECTS_SUCCESS:
      return Object.assign({}, state, { data: action.payload, loading: false });
    case FETCH_PROJECTS_ERROR:
      return Object.assign({}, state, { error: action.payload, loading: false });
    default:
      return state;
  }
}

// Action Creators
function fetchProjects() {
  return (dispatch) => {
    dispatch({
      type: FETCH_PROJECTS
    });
    const query = {
      current_user_roles: ALLOWED_ROLES
    };
    apiClient.type('projects').get(query)
    .then((projects) => {
      dispatch({
        type: FETCH_PROJECTS_SUCCESS,
        payload: projects
      });
    });
  };
}

// Exports
export default projectsReducer;

export {
  fetchProjects
};
