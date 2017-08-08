import React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton } from 'pui-react-buttons';

const LogoutButton = ({ logout, user }) =>
  (
    <div className="logout-button">
      <DefaultButton type="submit" onClick={logout}>Logout {user.login}</DefaultButton>
    </div>
  );

LogoutButton.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    login: PropTypes.string
  }).isRequired
};

export default LogoutButton;
