import apiClient from 'panoptes-client/lib/api-client';

// Action Types
export const RESET_TRANSLATIONS = 'RESET_TRANSLATIONS';
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

// Reducer
const initialState = {
  original: null,
  translation: null,
  translations: [],
  error: false,
  loading: false
};

const resourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_TRANSLATIONS:
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
function resetTranslations() {
  return (dispatch) => {
    dispatch({
      type: RESET_TRANSLATIONS
    });
  };
}

function fetchTranslations(translated_id, type, project, language) {
  const translated_type = type || 'project';
  return (dispatch) => {
    dispatch({
      type: FETCH_TRANSLATIONS,
      resource_type: type
    });
    apiClient.type('translations').get({ translated_type, translated_id })
    .then((resources) => {
      const { primary_language } = project;
      const { original, translations } = filterResources(resources, primary_language);
      if (translations.length && language) {
        dispatch(selectTranslation(original, translations, type, language));
      }
      dispatch({
        type: FETCH_TRANSLATIONS_SUCCESS,
        payload: { original, translations, loading: false }
      });
    });
  };
}

function createTranslation(original, translations, type, language) {
  // Mini courses are actually tutorials so use the correct resource type.
  if (type === 'mini_courses') {
    type = 'tutorials';
  }
  return (dispatch) => {
    const newResource = Object.assign({}, original);
    delete newResource.id;
    delete newResource.href;
    delete newResource.created_at;
    delete newResource.updated_at;
    delete newResource.links.attached_images;
    newResource.language = language.value;
    dispatch({
      type: CREATE_TRANSLATION,
      newResource,
      original
    });
    apiClient.type(type)
    .create(newResource)
    .save()
      .then((translation) => {
        if (original.links.attached_images) {
          translation.links.attached_images = original.links.attached_images;
        }
        translations.push(translation);
        dispatch({
          type: CREATE_TRANSLATION_SUCCESS,
          payload: { translation, translations, loading: false }
        });
      })
      .catch(error => console.error(error));
  };
}

function selectTranslation(original, translations, type, language) {
  type = type || 'project_contents';
  const translation = translations.find(translation => translation.language === language.value);
  return (dispatch) => {
    if (translation) {
      dispatch({
        type: SELECT_TRANSLATION,
        resource_type: type,
        payload: { translation }
      });
    } else {
      dispatch(createTranslation(original, translations, type, language));
    }
  };
}

function updateTranslation(translation, field, value) {
  return (dispatch) => {
    const changes = { [`strings.${field}`]: value };
    translation.update(changes);
    dispatch({
      type: UPDATE_TRANSLATION,
      payload: translation
    });
    const { translated_type, translated_id } = translation;
    translation.save({ translated_type, translated_id })
    .catch(error => console.error('Update translation error:', error));
  };
}
// Exports
export default resourceReducer;

export {
  createTranslation,
  selectTranslation,
  updateTranslation,
  fetchTranslations,
  resetTranslations
};
