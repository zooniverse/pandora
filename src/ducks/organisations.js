import apiClient from 'panoptes-client/lib/api-client';

const ALLOWED_ROLES = ['owner', 'collaborator', 'translator'];

// Action Types
export const FETCH_ORGANISATIONS = 'FETCH_ORGANISATIONS';
export const FETCH_ORGANISATIONS_SUCCESS = 'FETCH_ORGANISATIONS_SUCCESS';
export const FETCH_ORGANISATIONS_ERROR = 'FETCH_ORGANISATIONS_ERROR';

// Reducer
const initialState = {
  data: [],
  error: false,
  loading: false
};

function organisationsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORGANISATIONS:
      return Object.assign({}, initialState, { loading: true });
    case FETCH_ORGANISATIONS_SUCCESS:
      return Object.assign({}, state, { data: action.payload, loading: false });
    case FETCH_ORGANISATIONS_ERROR:
      return Object.assign({}, state, { error: action.payload, loading: false });
    default:
      return state;
  }
}

// Action Creators
function fetchOrganisations() {
  return (dispatch) => {
    dispatch({
      type: FETCH_ORGANISATIONS
    });
    const query = {
      current_user_roles: ALLOWED_ROLES
    };
    apiClient.type('organizations').get(query)
    .then((organisations) => {
      dispatch({
        type: FETCH_ORGANISATIONS_SUCCESS,
        payload: organisations
      });
    });
  };
}

// Exports
export default organisationsReducer;

export {
  fetchOrganisations
};
