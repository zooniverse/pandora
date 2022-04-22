import oauth from 'panoptes-client/lib/oauth';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkLoginUser, logoutFromPanoptes } from '../ducks/login';

import AdminToggle from './AdminContainer';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

function computeRedirectURL(window) {
  const { location } = window;
  return location.origin ||
    `${location.protocol}//${location.hostname}:${location.port}`;
}

function loginToPanoptes() {
  console.log(computeRedirectURL(window))
  // Returns a login page URL for the user to navigate to.
  return oauth.signIn(computeRedirectURL(window));
}

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    if (!props.initialised) {
      props.dispatch(checkLoginUser());
    }
  }

  login() {
    return loginToPanoptes();
  }

  logout() {
    this.props.dispatch(logoutFromPanoptes());
  }

  render() {
    return (this.props.user)
      ? (
        <React.Fragment>
          <LogoutButton user={this.props.user} logout={this.logout} />
          <AdminToggle user={this.props.user} />
        </React.Fragment>
      )
      : <LoginButton login={this.login} />;
  }
}

AuthContainer.propTypes = {
  user: PropTypes.shape({ login: PropTypes.string }),
  initialised: PropTypes.bool,
  dispatch: PropTypes.func
};

AuthContainer.defaultProps = {
  user: null,
  initialised: false,
  dispatch: Function.prototype
};

const mapStateToProps = state => ({
  user: state.login.user,
  initialised: state.login.initialised
});

export default connect(mapStateToProps)(AuthContainer);  // Connects the Component to the Redux Store
