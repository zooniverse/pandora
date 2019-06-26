import apiClient from 'panoptes-client/lib/api-client';

const ALLOWED_ROLES = ['owner', 'collaborator', 'translator'];

// Action Types
export const FETCH_ORGANISATION = 'FETCH_ORGANISATION';
export const FETCH_ORGANISATION_SUCCESS = 'FETCH_ORGANISATION_SUCCESS';
export const FETCH_ORGANISATION_ERROR = 'FETCH_ORGANISATION_ERROR';
export const ADD_LANGUAGE = 'ADD_LANGUAGE';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const FETCH_LANGUAGES_SUCCESS = 'FETCH_LANGUAGES_SUCCESS';

// Reducer
const initialState = {
  data: {},
  language: null,
  languageCodes: [],
  error: false,
  loading: false
};

function organisationReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORGANISATION:
      return Object.assign({}, initialState, { loading: true });
    case FETCH_ORGANISATION_SUCCESS:
    case FETCH_LANGUAGES_SUCCESS:
      return Object.assign({}, state, action.payload);
    case FETCH_ORGANISATION_ERROR:
      return Object.assign({}, state, { error: action.payload, loading: false });
    case SET_LANGUAGE:
      return Object.assign({}, state, { language: action.language });
    case ADD_LANGUAGE:
      return Object.assign({}, state, { languageCodes: action.languageCodes });
    default:
      return state;
  }
}

// Action Creators
function addLanguage(languageCodes) {
  return {
    type: ADD_LANGUAGE,
    languageCodes
  };
}
function setLanguage(language) {
  return {
    type: SET_LANGUAGE,
    language
  };
}

function fetchLanguages(organisation_id) {
  return (dispatch) => {
    apiClient
    .type('translations')
    .get({
      translated_type: 'Organization',
      translated_id: organisation_id
    })
    .then((resources) => {
      dispatch({
        type: FETCH_LANGUAGES_SUCCESS,
        payload: {
          languageCodes: resources.map(resource => resource.language)
        }
      });
    });
  };
}

function fetchOrganisation(id, isAdmin) {
  return (dispatch) => {
    dispatch({
      type: FETCH_ORGANISATION
    });
    const query = { id };
    if (!isAdmin) {
      query.current_user_roles = ALLOWED_ROLES;
    }
    apiClient.type('organizations').get(query)
    .then(([organisation]) => {
      dispatch({
        type: FETCH_ORGANISATION_SUCCESS,
        payload: {
          data: organisation,
          primary_language: organisation.primary_language,
          loading: false
        }
      });
    });
  };
}

// Exports
export default organisationReducer;

export {
  fetchOrganisation,
  addLanguage,
  setLanguage,
  fetchLanguages
};
