import apiClient from 'panoptes-client/lib/api-client';

// Action Types
export const FETCH_PROJECT = 'FETCH_PROJECT';
export const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';
export const FETCH_PROJECT_ERROR = 'FETCH_PROJECT_ERROR';
export const FETCH_WORKFLOWS = 'FETCH_WORKFLOWS';
export const FETCH_WORKFLOWS_SUCCESS = 'FETCH_WORKFLOWS_SUCCESS';
export const FETCH_WORKFLOWS_ERROR = 'FETCH_WORKFLOWS_ERROR';
export const FETCH_TUTORIALS = 'FETCH_TUTORIALS';
export const FETCH_TUTORIALS_SUCCESS = 'FETCH_TUTORIALS_SUCCESS';
export const FETCH_TUTORIALS_ERROR = 'FETCH_TUTORIALS_ERROR';

// Reducer
const initialState = {
  data: {},
  tutorials: [],
  workflows: [],
  error: false,
  loading: false,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT:
      return Object.assign({}, initialState, { loading: true });
    case FETCH_PROJECT_SUCCESS:
      return Object.assign({}, state, { data: action.payload, loading: false });
    case FETCH_PROJECT_ERROR:
      return Object.assign({}, state, { error: action.payload, loading: false });
    case FETCH_WORKFLOWS:
      return Object.assign({}, state, { loading: true });
    case FETCH_WORKFLOWS_SUCCESS:
      return Object.assign({}, state, { workflows: action.payload, loading: false });
    case FETCH_TUTORIALS:
      return Object.assign({}, state, { loading: true });
    case FETCH_TUTORIALS_SUCCESS:
      return Object.assign({}, state, { tutorials: action.payload, loading: false });
    default:
      return state;
  }
};

// Action Creators
const fetchProject = (id) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_PROJECT,
    });
    const query = {
      id,
      current_user_roles: ['owner', 'translator'],
      include: ['workflows']
    };
    apiClient.type('projects').get(query)
    .then(([project]) => {
      dispatch(fetchWorkflows(project));
      dispatch(fetchTutorials(project));
      dispatch({
        type: FETCH_PROJECT_SUCCESS,
        payload: project,
      });
    });
  };
};

function fetchWorkflows(project) {
  return (dispatch) => {
    dispatch({
      type: FETCH_WORKFLOWS,
    });
    apiClient.type('workflows').get(project.links.workflows)
    .then((workflows) => {
      dispatch({
        type: FETCH_WORKFLOWS_SUCCESS,
        payload: workflows,
      });
    });
  };
}

function fetchTutorials(project) {
  return (dispatch) => {
    dispatch({
      type: FETCH_TUTORIALS,
    });
    apiClient.type('tutorials').get({ project_id: project.id })
    .then((tutorials) => {
      dispatch({
        type: FETCH_TUTORIALS_SUCCESS,
        payload: tutorials,
      });
    });
  };
}

// Exports
export default projectReducer;

export {
  fetchProject
};
