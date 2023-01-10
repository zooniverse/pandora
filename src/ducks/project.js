import apiClient from 'panoptes-client/lib/api-client';

const ALLOWED_ROLES = ['owner', 'collaborator', 'translator'];

// Action Types
export const FETCH_PROJECT = 'FETCH_PROJECT';
export const FETCH_PROJECT_SUCCESS = 'FETCH_PROJECT_SUCCESS';
export const FETCH_PROJECT_ERROR = 'FETCH_PROJECT_ERROR';
export const FETCH_WORKFLOWS = 'FETCH_WORKFLOWS';
export const FETCH_WORKFLOWS_SUCCESS = 'FETCH_WORKFLOWS_SUCCESS';
export const FETCH_WORKFLOWS_ERROR = 'FETCH_WORKFLOWS_ERROR';
export const FETCH_TUTORIALS = 'FETCH_TUTORIALS';
export const FETCH_TUTORIALS_SUCCESS = 'FETCH_TUTORIALS_SUCCESS';
export const FETCH_TUTORIALS_ERROR = 'FETCH_TUTORIALS_ERROR';
export const FETCH_PAGES = 'FETCH_PAGES';
export const FETCH_PAGES_SUCCESS = 'FETCH_PAGES_SUCCESS';
export const FETCH_PAGES_ERROR = 'FETCH_PAGES_ERROR';
export const FETCH_FIELDGUIDES = 'FETCH_FIELDGUIDES';
export const FETCH_FIELDGUIDES_SUCCESS = 'FETCH_FIELDGUIDES_SUCCESS';
export const FETCH_FIELDGUIDES_ERROR = 'FETCH_FIELDGUIDES_ERROR';
export const ADD_LANGUAGE = 'ADD_LANGUAGE';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const FETCH_LANGUAGES_SUCCESS = 'FETCH_LANGUAGES_SUCCESS';

// Reducer
const initialState = {
  data: {},
  fieldguides: [],
  language: null,
  languageCodes: [],
  pages: [],
  tutorials: [],
  workflows: [],
  error: false,
  loading: false
};

function projectReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROJECT: {
      return {
        ...initialState,
        loading: true
      };
    }
    case FETCH_PROJECT_SUCCESS: {
      const { data, primary_language } = action.payload;
      return {
        ...state,
        data,
        primary_language
      };
    }
    case FETCH_LANGUAGES_SUCCESS: {
      const { languageCodes } = action.payload;
      return {
        ...state,
        languageCodes
      };
    }
    case FETCH_PROJECT_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    }
    case FETCH_WORKFLOWS: {
      return {
        ...state,
        loading: true
      };
    }
    case FETCH_WORKFLOWS_SUCCESS: {
      const workflows = action.payload;
      return {
        ...state,
        workflows,
        loading: false
      };
    }
    case FETCH_TUTORIALS:
    case FETCH_PAGES:
    case FETCH_FIELDGUIDES: {
      return {
        ...state,
        loading: true
      };
    }
    case FETCH_TUTORIALS_SUCCESS: {
      const tutorials = action.payload;
      return {
        ...state,
        tutorials,
        loading: false
      };
    }
    case FETCH_PAGES_SUCCESS: {
      const pages = action.payload;
      return {
        ...state,
        pages,
        loading: false
      };
    }
    case FETCH_FIELDGUIDES_SUCCESS: {
      const fieldguides = action.payload;
      return {
        ...state,
        fieldguides,
        loading: false
      };
    }
    case SET_LANGUAGE: {
      return {
        ...state,
        language: action.language
      };
    }
    case ADD_LANGUAGE: {
      return {
        ...state,
        languageCodes: action.languageCodes
      };
    }
    default: {
      return state;
    }
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

function fetchLanguages(project_id) {
  return (dispatch) => {
    apiClient
      .type('translations')
      .get({
        translated_type: 'Project',
        translated_id: project_id
      })
      .then((resources) => {
        dispatch({
          type: FETCH_LANGUAGES_SUCCESS,
          payload: {
            languageCodes: resources.map((resource) => resource.language)
          }
        });
      });
  };
}

function fetchProject(id, isAdmin) {
  return (dispatch) => {
    dispatch({
      type: FETCH_PROJECT
    });
    const query = { id };
    if (!isAdmin) {
      query.current_user_roles = ALLOWED_ROLES;
    }
    apiClient.type('projects').get(query)
      .then(([project]) => {
        const {
          id,
          display_name,
          description,
          introduction,
          researcher_quote,
          slug,
          workflow_description
        } = project;
        dispatch({
          type: FETCH_PROJECT_SUCCESS,
          payload: {
            data: {
              id,
              display_name,
              description,
              introduction,
              researcher_quote,
              slug,
              workflow_description
            },
            primary_language: project.primary_language,
            loading: false
          }
        });
        dispatch(fetchWorkflows(project));
        dispatch(fetchTutorials(project));
        dispatch(fetchPages(project));
        dispatch(fetchFieldGuides(project));
      });
  };
}

function fetchWorkflows(project) {
  return (dispatch) => {
    dispatch({
      type: FETCH_WORKFLOWS
    });
    apiClient.type('workflows').get(project.links.workflows)
      .then((workflows) => {
        dispatch({
          type: FETCH_WORKFLOWS_SUCCESS,
          payload: workflows.map(({ id, display_name }) => ({ id, display_name }))
        });
      });
  };
}

function fetchTutorials(project) {
  return (dispatch) => {
    dispatch({
      type: FETCH_TUTORIALS
    });
    apiClient.type('tutorials').get({ project_id: project.id, language: project.primary_language })
      .then((tutorials) => {
        dispatch({
          type: FETCH_TUTORIALS_SUCCESS,
          payload: tutorials.map(({ id, display_name }) => ({ id, display_name }))
        });
      });
  };
}

function fetchPages(project) {
  return (dispatch) => {
    dispatch({
      type: FETCH_PAGES
    });
    project.get('pages')
      .then((pages) => {
        dispatch({
          type: FETCH_PAGES_SUCCESS,
          payload: pages.map(({ id, title, content }) => ({ id, title, content }))
        });
      });
  };
}

function fetchFieldGuides(project) {
  return (dispatch) => {
    dispatch({
      type: FETCH_FIELDGUIDES
    });
    apiClient.type('field_guides').get({ project_id: project.id, language: project.primary_language })
      .then((fieldguides) => {
        dispatch({
          type: FETCH_FIELDGUIDES_SUCCESS,
          payload: fieldguides.map(({ id, display_name }) => ({ id, display_name }))
        });
      });
  };
}

// Exports
export default projectReducer;

export {
  fetchProject,
  addLanguage,
  setLanguage,
  fetchLanguages
};
