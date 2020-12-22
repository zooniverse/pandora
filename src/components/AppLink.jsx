import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Anchor } from 'grommet';

export default function AppLink({ label, to, ...rest }) {
  return (
    <Anchor
      as={({ colorProp, hasIcon, hasLabel, focus, ...linkProps }) => <Link {...linkProps} />}
      label={label}
      to={to}
      {...rest}
    />
  )
}

AppLink.propTypes = {
  label: PropTypes.string,
  to: PropTypes.string
}