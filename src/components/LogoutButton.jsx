import React from 'react';
import PropTypes from 'prop-types';

const LogoutButton = ({ logout, user }) => {
  return (
    <div className="logout-button">
      <button type="submit" onClick={logout}>Logout {user.login}</button>
    </div>
  );
};

LogoutButton.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    login: PropTypes.string,
  }).isRequired,
};

export default LogoutButton;
