import React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton } from 'pui-react-buttons';

const LoginButton = ({ login }) =>
  (
    <DefaultButton type="submit" onClick={login}>Login</DefaultButton>
  );

LoginButton.propTypes = {
  login: PropTypes.func.isRequired
};

export default LoginButton;
