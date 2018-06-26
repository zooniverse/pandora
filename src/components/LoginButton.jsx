import React from 'react';
import PropTypes from 'prop-types';
import Button from 'grommet/components/Button';

const LoginButton = ({ login }) =>
  (
    <Button
      label="Login"
      type="submit"
      onClick={login}
    />
  );

LoginButton.propTypes = {
  login: PropTypes.func.isRequired
};

export default LoginButton;
