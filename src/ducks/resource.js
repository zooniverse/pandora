import apiClient from 'panoptes-client/lib/api-client';

// Action Types
export const FETCH_RESOURCE = 'FETCH_RESOURCE';
export const FETCH_RESOURCE_SUCCESS = 'FETCH_RESOURCE_SUCCESS';
export const FETCH_RESOURCE_ERROR = 'FETCH_RESOURCE_ERROR';

// Reducer
const initialState = {
  data: [],
  error: false,
  loading: false,
};

const resourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESOURCE:
      return Object.assign({}, initialState, { loading: true });
    case FETCH_RESOURCE_SUCCESS:
      return Object.assign({}, state, { data: action.payload, loading: false });
    case FETCH_RESOURCE_ERROR:
      return Object.assign({}, state, { error: action.payload, loading: false });
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

const createNewTranslation = (type) =>
  (dispatch, getState) => {
    const { contents } = getState();
    const translation = apiClient.type(type).create({
      title: contents.title,
      description: contents.description,
      introduction: contents.introduction,
      language: 'nz',
      'links.project': contents.links.project,
    });
    translation.save()
      .then(res => console.info('Saved! ', res))
      .catch(error => console.error(error));
  };

// Exports
export default resourceReducer;

export {
  createNewTranslation,
  fetchResource,
};
