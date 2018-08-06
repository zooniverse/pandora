import apiClient from 'panoptes-client/lib/api-client';

// Action Types
export const RESET_TRANSLATIONS = 'RESET_TRANSLATIONS';
export const FETCH_TRANSLATIONS = 'FETCH_TRANSLATIONS';
export const FETCH_TRANSLATIONS_SUCCESS = 'FETCH_TRANSLATIONS_SUCCESS';
export const CREATE_TRANSLATION = 'CREATE_TRANSLATION';
export const CREATE_TRANSLATION_SUCCESS = 'CREATE_TRANSLATION_SUCCESS';
export const SELECT_TRANSLATION = 'SELECT_TRANSLATION';
export const UPDATE_TRANSLATION = 'UPDATE_TRANSLATION';
export const TRANSLATIONS_ERROR = 'TRANSLATIONS_ERROR';

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
    case SELECT_TRANSLATION:
      return Object.assign({}, state, action.payload);
    case UPDATE_TRANSLATION:
      return Object.assign({}, state, { translation: action.payload });
    case TRANSLATIONS_ERROR:
      return Object.assign({}, state, { error: action.payload, loading: false });
    default:
      return state;
  }
};

// Action Creators
function handleError(error) {
  console.warn(error);
  return {
    type: TRANSLATIONS_ERROR,
    payload: error
  };
}

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
      dispatch({
        type: FETCH_TRANSLATIONS_SUCCESS,
        payload: { original, translations, loading: false }
      });
      if (language) {
        dispatch(selectTranslation(original, translations, type, language));
      }
    })
    .catch((error) => {
      dispatch(handleError(error));
    });
  };
}

function createTranslation(original, translations, type, language) {
  // Mini courses are actually tutorials so use the correct resource type.
  if (type === 'mini_courses') {
    type = 'tutorials';
  }
  return (dispatch) => {
    const { translated_type, translated_id } = original;
    const newResource = {
      language: language.value,
      strings: {}
    };
    dispatch({
      type: CREATE_TRANSLATION,
      newResource,
      original
    });
    apiClient.type('translations')
    .create(newResource)
    .save({ translated_type, translated_id })
      .then((translation) => {
        translations.push(translation);
        dispatch({
          type: CREATE_TRANSLATION_SUCCESS,
          payload: { translation, translations, loading: false }
        });
      })
      .catch((error) => {
        dispatch(handleError(error));
      });
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
        language: language,
        payload: { translation }
      });
    } else {
      dispatch(createTranslation(original, translations, type, language));
    }
  };
}

function updateTranslation(original, translation, updatedField, value) {
  return (dispatch) => {
    const strings = {};
    Object.keys(original.strings).forEach((field) => {
      strings[field] = translation.strings[field] || '';
    });
    strings[updatedField] = value;
    const changes = { strings };
    translation.update(changes);
    dispatch({
      type: UPDATE_TRANSLATION,
      payload: translation
    });
    const { translated_type, translated_id } = translation;
    translation.save({ translated_type, translated_id })
    .catch((error) => {
      dispatch(handleError(error));
    });
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
