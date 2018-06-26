import React from 'react';
import PropTypes from 'prop-types';
import Button from 'grommet/components/Button';

const LogoutButton = ({ logout, user }) =>
  (
    <div className="logout-button">
      <Button
        label={`Logout ${user.login}`}
        type="submit"
        onClick={logout}
      />
    </div>
  );

LogoutButton.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    login: PropTypes.string
  }).isRequired
};

export default LogoutButton;
