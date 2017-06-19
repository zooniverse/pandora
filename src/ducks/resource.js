import apiClient from 'panoptes-client/lib/api-client';

// Action Types
export const FETCH_RESOURCE = 'FETCH_RESOURCE';
export const FETCH_RESOURCE_SUCCESS = 'FETCH_RESOURCE_SUCCESS';
export const FETCH_RESOURCE_ERROR = 'FETCH_RESOURCE_ERROR';
export const CREATE_TRANSLATION_SUCCESS = 'CREATE_TRANSLATION_SUCCESS';

// Reducer
const initialState = {
  original: [],
  translation: null,
  error: false,
  loading: false,
};

const resourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESOURCE:
      return Object.assign({}, initialState, { loading: true });
    case FETCH_RESOURCE_SUCCESS:
      return Object.assign({}, state, { original: action.payload, loading: false });
    case FETCH_RESOURCE_ERROR:
      return Object.assign({}, state, { error: action.payload, loading: false });
    case CREATE_TRANSLATION_SUCCESS:
      return Object.assign({}, state, { translation: action.payload, loading: false });
    default:
      return state;
  }
};

// Action Creators
const fetchResource = (id, type) => {
  type = type ? type : 'projects';
  return (dispatch) => {
    switch (type) {
      case 'projects':
      case 'workflows':
        dispatch(fetchResourceContents(id, type));
        break;
      default:
        dispatch({
          type: FETCH_RESOURCE,
        });
        apiClient.type(type).get({ id })
        .then((resource) => {
          dispatch({
            type: FETCH_RESOURCE_SUCCESS,
            payload: resource,
          });
        });
    }
  };
};

function fetchResourceContents(id, type) {
  return (dispatch) => {
    dispatch({
      type: FETCH_RESOURCE,
    });
    let key = '';
    switch (type) {
      case 'projects':
        key = 'project_id';
        type = 'project_contents';
        break;
      case 'workflows':
        key = 'workflow_id';
        type = 'workflow_contents';
        break;
    }
    const query = {};
    query[key] = id;
    apiClient.type(type).get(query)
    .then((resource) => {
      dispatch({
        type: FETCH_RESOURCE_SUCCESS,
        payload: resource,
      });
    });
  };
}

const createTranslation = (type, lang) =>
  (dispatch, getState) => {
    const { original } = getState();
    const newResource = Object.assign({}, original);
    newResource.lang = lang;
    apiClient.type(type)
    .create(newResource)
    .save()
      .then((translation) => {
        dispatch({
          type: CREATE_TRANSLATION_SUCCESS,
          payload: translation,
        });
      })
      .catch(error => console.error(error));
  };

// Exports
export default resourceReducer;

export {
  createTranslation,
  fetchResource,
};
