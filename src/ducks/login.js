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
        user: action.user, // null if logged out.
        initialised: true // true once we know if user is logged in/out; false if unknown.
      };
    }
    case SET_ADMIN_MODE: {
      const { adminMode } = action;
      return {
        ...state,
        adminMode
      };
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
      .then((userResource) => {
        let user = null;
        if (userResource) {
          const {
            id, admin, display_name, login
          } = userResource;
          user = {
            id, admin, display_name, login
          };
        }

        dispatch({
          type: SET_LOGIN_USER,
          user
        });
      });
  };
}

function logoutFromPanoptes() {
  return (dispatch) => {
    oauth.signOut()
      .then((user) => {
        dispatch({
          type: SET_LOGIN_USER,
          user
        });
      });
  };
}

function setAdminMode(adminMode) {
  return {
    type: SET_ADMIN_MODE,
    adminMode
  };
}

// Exports
export default loginReducer;

export {
  checkLoginUser,
  logoutFromPanoptes,
  setAdminMode
};
