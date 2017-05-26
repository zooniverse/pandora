import apiClient from 'panoptes-client/lib/api-client';

// Action Types
export const FETCH_PROJECT_CONTENTS = 'FETCH_PROJECT_CONTENTS';
export const FETCH_PROJECT_CONTENTS_SUCCESS = 'FETCH_PROJECT_CONTENTS_SUCCESS';
export const FETCH_PROJECT_CONTENTS_ERROR = 'FETCH_PROJECT_CONTENTS_ERROR';

// Reducer
const initialState = {
  data: [],
  error: false,
  loading: false,
};

const projectContentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT_CONTENTS:
      return Object.assign({}, initialState, { loading: true });
    case FETCH_PROJECT_CONTENTS_SUCCESS:
      return Object.assign({}, state, { data: action.payload, loading: false });
    case FETCH_PROJECT_CONTENTS_ERROR:
      return Object.assign({}, state, { error: action.payload, loading: false });
    default:
      return state;
  }
};

// Action Creators
const fetchProjectContents = (project_id) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_PROJECT_CONTENTS,
    });
    apiClient.type('project_contents').get(project_id)
    .then((projectContents) => {
      dispatch({
        type: FETCH_PROJECT_CONTENTS_SUCCESS,
        payload: projectContents,
      });
    });
  };
};

const createNewTranslation = () =>
  (dispatch, getState) => {
    const { contents } = getState();
    const contentsCopy = apiClient.type('project_contents').create({
      title: contents.title,
      description: contents.description,
      introduction: contents.introduction,
      language: 'nz',
      'links.project': contents.links.project,
    });
    contentsCopy.save()
      .then(res => console.info('Saved! ', res))
      .catch(error => console.error(error));
  };

// Exports
export default projectContentsReducer;

export {
  createNewTranslation,
  fetchProjectContents,
};
