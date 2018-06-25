import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import AuthContainer from '../containers/AuthContainer';

function App(props) {
  return (
    <div>
      <header className="site-header">
        <h1 className="title">Pandora</h1>
        <Link to="/about" className="link">About</Link>
        <AuthContainer />
      </header>
      <section className="content-section">
        {props.user ? props.children : <p>You must be logged in to edit translations.</p>}
      </section>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
  user: PropTypes.shape({
    id: PropTypes.string
  })
};

App.defaultProps = {
  children: null,
  user: null
};

const mapStateToProps = state => ({
  user: state.login.user,
  initialised: state.login.initialised
});

export default connect(mapStateToProps)(App);
export { App };

