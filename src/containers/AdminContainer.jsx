import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CheckBox } from 'grommet';
import apiClient from 'panoptes-client/lib/api-client';
import { setAdminMode } from '../ducks/login';

export class AdminContainer extends React.Component {
  constructor(props) {
    super(props);

    this.setAdminState = this.setAdminState.bind(this);
    this.toggleAdminMode = this.toggleAdminMode.bind(this);
  }

  componentDidMount() {
    const isAdmin = !!localStorage.getItem('adminFlag');
    if (isAdmin) {
      this.setAdminState(isAdmin);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.adminMode !== this.props.adminMode) {
      this.setAdminState(nextProps.adminMode);
    }
  }

  setAdminState(isAdmin) {
    const { user } = this.props;
    isAdmin = user.admin && isAdmin;
    apiClient.update({
      'params.admin': isAdmin || undefined,
    });

    if (isAdmin) {
      localStorage.setItem('adminFlag', true);
    } else {
      localStorage.removeItem('adminFlag');
    }

    this.props.dispatch(setAdminMode(isAdmin));
  }

  toggleAdminMode(e) {
    const { user } = this.props;
    const isAdmin = user.admin && e.target.checked;
    this.setAdminState(isAdmin);
  }

  render() {
    if (this.props.initialised && this.props.user && this.props.user.admin) {
      return (
        <CheckBox
          checked={this.props.adminMode}
          id="admin-checkbox"
          name="admin-checkbox"
          label="Admin mode"
          onChange={this.toggleAdminMode}
          toggle={true}
        />
      )
    }

    return null;
  }

}

AdminContainer.defaultProps = {
  adminMode: false,
  dispatch: () => {},
  initialised: false,
  user: null,
};

AdminContainer.propTypes = {
  adminMode: PropTypes.bool,
  dispatch: PropTypes.func,
  initialised: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.string,
    admin: PropTypes.bool,
  }),
};

function mapStateToProps(state) {
  return {
    adminMode: state.login.adminMode,
    initialised: state.login.initialised,
    user: state.login.user,
  };
}

export default connect(mapStateToProps)(AdminContainer);