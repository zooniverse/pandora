import apiClient from 'panoptes-client/lib/api-client';

// Action Types
export const RESET_TRANSLATIONS = 'RESET_TRANSLATIONS';
export const RESET_ERRORS = 'RESET_ERRORS';
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
    case RESET_TRANSLATIONS: {
      return {
        ...initialState,
        loading: true
      };
    }
    case FETCH_TRANSLATIONS: {
      return {
        ...initialState,
        loading: true
      };
    }
    case CREATE_TRANSLATION: {
      return {
        ...state,
        loading: true
      };
    }
    case FETCH_TRANSLATIONS_SUCCESS: {
      const { original, translations } = action.payload;
      return {
        ...state,
        original,
        translations,
        loading: false
      };
    }
    case CREATE_TRANSLATION_SUCCESS: {
      const { translation } = action.payload;
      return {
        ...state,
        translation,
        translations: [...state.translations, translation],
        loading: false
      };
    }
    case SELECT_TRANSLATION: {
      const { translation } = action.payload;
      return {
        ...state,
        translation
      };
    }
    case UPDATE_TRANSLATION: {
      return {
        ...state,
        translation: action.payload
      };
    }
    case TRANSLATIONS_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    }
    case RESET_ERRORS: {
      return {
        ...state,
        error: initialState.error,
        loading: false
      };
    }
    default: {
      return state;
    }
  }
};

// Action Creators
function handleError(error) {
  console.warn(error);
  let { message, status, statusText } = error;
  message = message || 'An unknown error occurred.';
  status = status || 0;
  statusText = statusText || 'Bad response from server.';
  return {
    type: TRANSLATIONS_ERROR,
    payload: { message, status, statusText }
  };
}

function resetErrors() {
  return { type: RESET_ERRORS };
}
function resetTranslations() {
  return (dispatch) => {
    dispatch({
      type: RESET_TRANSLATIONS
    });
  };
}

function fetchTranslations(translated_id, type, primary_language, selectedLanguage) {
  const translated_type = type || 'project';
  return (dispatch) => {
    dispatch({
      type: FETCH_TRANSLATIONS,
      resource_type: type
    });
    apiClient.type('translations').get({ translated_type, translated_id })
    .then((resources) => {
      const { original, translations } = filterResources(
        resources.map(({
          id,
          language,
          string_versions,
          strings
        }) => ({
          id,
          language,
          string_versions,
          strings,
          translated_type,
          translated_id
        })),
        primary_language
      );
      dispatch({
        type: FETCH_TRANSLATIONS_SUCCESS,
        payload: { original, translations, loading: false }
      });
      if (selectedLanguage) {
        dispatch(selectTranslation(original, translations, type, selectedLanguage));
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
    if (!original) {
      const errorMessage = `No primary language version exists for ${type}`;
      throw new Error(errorMessage);
    }
    const { translated_type, translated_id } = original;
    const newResource = {
      language,
      strings: {},
      string_versions: {}
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
        const {
          id,
          string_versions,
          strings
        } = translation;
        dispatch({
          type: CREATE_TRANSLATION_SUCCESS,
          payload: {
            translation: {
              id,
              language,
              string_versions,
              strings,
              translated_type,
              translated_id
            }
          }
        });
      })
      .catch((error) => {
        dispatch(handleError(error));
      });
  };
}

function selectTranslation(original, translations, type, language) {
  type = type || 'project_contents';
  const translation = translations.find(t => t.language === language);
  return (dispatch) => {
    if (translation) {
      dispatch({
        type: SELECT_TRANSLATION,
        resource_type: type,
        language,
        payload: { translation }
      });
    } else {
      dispatch(createTranslation(original, translations, type, language));
    }
  };
}

function updateTranslation(original, translation, updatedField, value) {
  return (dispatch) => {
    const {
      id,
      language,
      translated_type,
      translated_id
    } = translation;

    // create new strings since existing state can't be mutated.
    const strings = {};
    const string_versions = {};
    Object.keys(original.strings).forEach((field) => {
      strings[field] = translation.strings[field] || '';
      string_versions[field] = translation.string_versions[field];
    });

    strings[updatedField] = value;
    string_versions[updatedField] = original.string_versions[updatedField];

    dispatch({
      type: UPDATE_TRANSLATION,
      payload: {
        id,
        language,
        string_versions,
        strings,
        translated_type,
        translated_id
      }
    });

    // Save the changes to Panoptes.
    const changes = { strings, string_versions };
    apiClient.type('translations')
    .create(translation)
    .update(changes)
    .save({ translated_type, translated_id })
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
  resetTranslations,
  resetErrors
};
