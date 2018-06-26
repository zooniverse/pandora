import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GrommetApp from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';

import AuthContainer from '../containers/AuthContainer';

function App(props) {
  return (
    <GrommetApp>
      <Header className="site-header">
        <h1 className="title">Pandora</h1>
        <AuthContainer />
      </Header>
      <Section className="content-section">
        {props.user ? props.children : <p>You must be logged in to edit translations.</p>}
      </Section>
    </GrommetApp>
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

