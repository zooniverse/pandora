import oauth from 'panoptes-client/lib/oauth';

// Action Types
const SET_LOGIN_USER = 'project/user/SET_LOGIN_USER';
const SET_ADMIN_MODE = 'project/user/SET_ADMIN_MODE';

// Reducer
const initialState = {
  adminMode: false,
  user: null,
  initialised: false
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN_USER: {
      return {
        adminMode: false,
        user: action.user,  // null if logged out.
        initialised: true  // true once we know if user is logged in/out; false if unknown.
      };
    }
    case SET_ADMIN_MODE: {
      const { adminMode } = action;
      return Object.assign({}, state, { adminMode });
    }
    default:
      return state;
  }
}

// Action Creators
function checkLoginUser() {
  // First thing on app load - check if the user is logged in.
  return (dispatch) => {
    oauth.checkCurrent()
      .then((user) => {
        dispatch(setLoginUser(user));
      });
  };
}

function loginToPanoptes() {
  // Returns a login page URL for the user to navigate to.
  return (() => oauth.signIn(computeRedirectURL(window)));
}

function logoutFromPanoptes() {
  return (dispatch) => {
    oauth.signOut()
      .then((user) => {
        dispatch(setLoginUser(user));
      });
  };
}

function setLoginUser(user) {
  return (dispatch) => {
    dispatch({
      type: SET_LOGIN_USER,
      user
    });
  };
}

function setAdminMode(adminMode) {
  return {
    type: SET_ADMIN_MODE,
    adminMode
  };
}

// Helper functions
function computeRedirectURL(window) {
  const { location } = window;
  return location.origin ||
    `${location.protocol}//${location.hostname}:${location.port}`;
}

// Exports
export default loginReducer;

export {
  checkLoginUser,
  loginToPanoptes,
  logoutFromPanoptes,
  setLoginUser,
  setAdminMode
};
