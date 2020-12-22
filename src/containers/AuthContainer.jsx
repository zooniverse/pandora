import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkLoginUser, loginToPanoptes, logoutFromPanoptes } from '../ducks/login';
import { ZooHeader } from '@zooniverse/react-components'
import AdminToggle from './AdminContainer';

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
    return this.props.dispatch(loginToPanoptes());
  }

  logout() {
    this.props.dispatch(logoutFromPanoptes());
  }

  render() {
    const { user } = this.props
    return (<ZooHeader signIn={this.login} signOut={this.logout} user={user ||  {}} />)
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
