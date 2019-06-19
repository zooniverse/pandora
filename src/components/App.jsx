import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GrommetApp from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import apiClient from 'panoptes-client/lib/api-client';
import oauth from 'panoptes-client/lib/oauth';

import AuthContainer from '../containers/AuthContainer';

function App(props) {
  apiClient.beforeEveryRequest = function checkSessionToken() {
    return oauth.checkBearerToken()
      .then((token) => {
        // If the App thinks you're logged in, but the token says otherwise, reject with an error.
        if (props.initialised && props.user && !token) {
          return Promise.reject(new Error('Your Panoptes session has expired.'));
          // The intent is that if the user is supposed to be logged in but
          // isn't, the whole request (that comes after .beforeEveryRequest)
          // should not continue.
        }
        return token;
      });
  };

  const isStaging = process.env.NODE_ENV === 'staging';
  return (
    <GrommetApp>
      <Header className="site-header">
        <h1 className="title">Translate your projects</h1>
        <AuthContainer />
      </Header>
      <Section className="content-section">
        {isStaging &&
          <div>
            <p>You can now edit your project translations at <a href="https://translations.zooniverse.org">https://translations.zooniverse.org</a></p>
            <p>A big thanks to everyone who helped us test out translations for Panoptes. This site will continue to be used for testing of new features.</p>
          </div>
        }
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

