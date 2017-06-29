import apiClient from 'panoptes-client/lib/api-client';

// Action Types
export const FETCH_RESOURCE = 'FETCH_RESOURCE';
export const FETCH_RESOURCE_SUCCESS = 'FETCH_RESOURCE_SUCCESS';
export const FETCH_RESOURCE_ERROR = 'FETCH_RESOURCE_ERROR';
export const CREATE_TRANSLATION_SUCCESS = 'CREATE_TRANSLATION_SUCCESS';
export const UPDATE_TRANSLATION = 'UPDATE_TRANSLATION';

// Helpers
function filterResources(resources, primary_language) {
  const original = resources.find(resource => resource.language === primary_language);
  const translations = resources.filter(resource => resource.language !== primary_language);
  return { original, translations };
}

function projectResourcesPromise(project_id, type) {
  return apiClient.type(type).get({ project_id });
}

function workflowResourcesPromise(workflow_id, type) {
  return apiClient.type(type).get({ workflow_id });
}

// Reducer
const initialState = {
  original: null,
  translation: null,
  translations: [],
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
function fetchResource(id, type, project) {
  type = type || 'projects';
  let fetchResources;
  switch (type) {
    case 'projects':
      fetchResources = projectResourcesPromise(project.id, 'project_contents');
      break;
    case 'field_guides':
      fetchResources = projectResourcesPromise(project.id, 'field_guides');
      break;
    case 'workflows':
      fetchResources = workflowResourcesPromise(id, 'workflow_contents');
      break;
    case 'tutorials':
      fetchResources = workflowResourcesPromise(id, 'tutorials');
      break;
    case 'project_pages':
      fetchResources = project.get('pages', { url_key: id });
      break;
    default:
      fetchResources = apiClient.type(type).get({ id });
  }
  return (dispatch) => {
    dispatch({
      type: FETCH_RESOURCE,
      resource_type: type
    });
    fetchResources
    .then((resources) => {
      const { primary_language } = project;
      const { original, translations } = filterResources(resources, primary_language);
      dispatch({
        type: FETCH_RESOURCE_SUCCESS,
        payload: { original, translations, loading: false }
      });
    });
  };
}

const createTranslation = (original, type, lang) =>
  (dispatch) => {
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

function updateTranslation(translation, field, value) {
  return (dispatch) => {
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
