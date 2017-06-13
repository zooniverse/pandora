import apiClient from 'panoptes-client/lib/api-client';

// Action Types
export const FETCH_PROJECT = 'FETCH_PROJECT';
export const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';
export const FETCH_PROJECT_ERROR = 'FETCH_PROJECT_ERROR';

// Reducer
const initialState = {
  data: {
    links: {
      workflows: []
    }
  },
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
      current_user_roles: ['owner', 'translator']
    };
    apiClient.type('projects').get(query)
    .then(([project]) => {
      dispatch({
        type: FETCH_PROJECT_SUCCESS,
        payload: project,
      });
    });
  };
};

// Exports
export default projectReducer;

export {
  fetchProject
};
