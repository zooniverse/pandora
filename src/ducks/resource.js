import apiClient from 'panoptes-client/lib/api-client';

// Action Types
export const FETCH_RESOURCE = 'FETCH_RESOURCE';
export const FETCH_RESOURCE_SUCCESS = 'FETCH_RESOURCE_SUCCESS';
export const FETCH_RESOURCE_ERROR = 'FETCH_RESOURCE_ERROR';
export const CREATE_TRANSLATION_SUCCESS = 'CREATE_TRANSLATION_SUCCESS';
export const UPDATE_TRANSLATION = 'UPDATE_TRANSLATION';

// Reducer
const initialState = {
  original: null,
  translation: null,
  error: false,
  loading: false,
};

const resourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESOURCE:
      return Object.assign({}, initialState, { loading: true });
    case FETCH_RESOURCE_SUCCESS:
    case CREATE_TRANSLATION_SUCCESS:
      return Object.assign({}, state, action.payload);
    case FETCH_RESOURCE_ERROR:
      return Object.assign({}, state, { error: action.payload, loading: false });
    case UPDATE_TRANSLATION:
      return Object.assign({}, state, { translation: action.payload });
    default:
      return state;
  }
};

// Action Creators
const fetchResource = (id, type) => {
  type = type || 'projects';
  return (dispatch) => {
    switch (type) {
      case 'projects':
      case 'workflows':
        dispatch(fetchResourceContents(id, type));
        break;
      case 'project_pages':
        dispatch(fetchProjectPages(id));
        break;
      default:
        dispatch({
          type: FETCH_RESOURCE,
        });
        apiClient.type(type).get({ id })
        .then(([original]) => {
          dispatch({
            type: FETCH_RESOURCE_SUCCESS,
            payload: { original, loading: false }
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
    .then(([original]) => {
      dispatch({
        type: FETCH_RESOURCE_SUCCESS,
        payload: { original, loading: false }
      });
    });
  };
}

function fetchProjectPages(id) {
  return (dispatch, getState) => {
    const project = getState().project.data;
    project.get('pages', {id})
    .then(([original]) => {
      dispatch({
        type: FETCH_RESOURCE_SUCCESS,
        payload: { original, loading: false }
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
          payload: { translation, loading: false },
        });
      })
      .catch(error => console.error(error));
  };

function updateTranslation(field, value) {
  (dispatch, getState) => {
    const { translation } = getState();
    const changes = { [field]: value };
    translation.update(changes);
    dispatch({
      type: UPDATE_TRANSLATION,
      payload: translation
    });
    translation.save()
    .catch(error => console.error(error));
  };
}
// Exports
export default resourceReducer;

export {
  createTranslation,
  updateTranslation,
  fetchResource,
};
