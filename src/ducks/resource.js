import apiClient from 'panoptes-client/lib/api-client';

// Action Types
export const FETCH_TRANSLATIONS = 'FETCH_TRANSLATIONS';
export const FETCH_TRANSLATIONS_SUCCESS = 'FETCH_TRANSLATIONS_SUCCESS';
export const FETCH_TRANSLATIONS_ERROR = 'FETCH_TRANSLATIONS_ERROR';
export const CREATE_TRANSLATION = 'CREATE_TRANSLATION';
export const CREATE_TRANSLATION_SUCCESS = 'CREATE_TRANSLATION_SUCCESS';
export const SELECT_TRANSLATION = 'SELECT_TRANSLATION';
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

function awaitTranslations(id, type, project) {
  switch (type) {
    case 'projects':
      return projectResourcesPromise(project.id, 'project_contents');
    case 'field_guides':
      return projectResourcesPromise(project.id, 'field_guides');
    case 'workflows':
      return workflowResourcesPromise(id, 'workflow_contents');
    case 'tutorials':
      return workflowResourcesPromise(id, 'tutorials');
    case 'project_pages':
      return project.get('pages', { url_key: id });
    default:
      return apiClient.type(type).get({ id });
  }
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
    case FETCH_TRANSLATIONS:
      return Object.assign({}, initialState, { loading: true });
    case CREATE_TRANSLATION:
      return Object.assign({}, state, { loading: true });
    case FETCH_TRANSLATIONS_SUCCESS:
    case CREATE_TRANSLATION_SUCCESS:
      return Object.assign({}, state, action.payload);
    case FETCH_TRANSLATIONS_ERROR:
      return Object.assign({}, state, { error: action.payload, loading: false });
    case SELECT_TRANSLATION:
      return Object.assign({}, state, action.payload);
    case UPDATE_TRANSLATION:
      return Object.assign({}, state, { translation: action.payload });
    default:
      return state;
  }
};

// Action Creators
function fetchTranslations(id, type, project) {
  type = type || 'projects';
  return (dispatch) => {
    dispatch({
      type: FETCH_TRANSLATIONS,
      resource_type: type
    });
    awaitTranslations(id, type, project)
    .then((resources) => {
      const { primary_language } = project;
      const { original, translations } = filterResources(resources, primary_language);
      dispatch({
        type: FETCH_TRANSLATIONS_SUCCESS,
        payload: { original, translations, loading: false }
      });
    });
  };
}

function createTranslation(original, translations, type, lang) {
  return (dispatch) => {
    const newResource = Object.assign({}, original);
    newResource.lang = lang;
    dispatch({
      type: CREATE_TRANSLATION
    });
    apiClient.type(type)
    .create(newResource)
    .save()
      .then((translation) => {
        translations.push(translation);
        dispatch({
          type: CREATE_TRANSLATION_SUCCESS,
          payload: { translation, translations, loading: false },
        });
      })
      .catch(error => console.error(error));
  };
}

function selectTranslation(original, translations, language) {
  const { type } = original;
  const translation = translations.find(translation => translation.language === language);
  return (dispatch) => {
    if (translation) {
      dispatch({
        type: SELECT_TRANSLATION,
        payload: { translation }
      });
    } else {
      dispatch(createTranslation(original, translations, type, language));
    }
  };
}

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
  selectTranslation,
  updateTranslation,
  fetchTranslations,
};
