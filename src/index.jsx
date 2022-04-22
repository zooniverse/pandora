import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, IndexRoute, Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import oauth from 'panoptes-client/lib/oauth';

import App from './components/App';
import config from './constants/config';
import reducer from './ducks/reducer';
import ResourceContainer from './containers/ResourceContainer';
import ProjectDashboardContainer from './containers/ProjectDashboardContainer';
import ProjectDashboard from './components/ProjectDashboard';
import OrganisationDashboardContainer from './containers/OrganisationDashboardContainer';
import OrganisationDashboard from './components/OrganisationDashboard';
import Home from './components/Home';
import Resource from './components/Resource';

// Todo: let's find a better way to include Styles,
// currently Styles looks like an unused var to eslint
import Styles from './styles/main.styl'; // eslint-disable-line no-unused-vars

const store = configureStore({ reducer });

oauth.init(config.panoptesAppId)
  .then(() => {
    ReactDOM.render((
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="/project/:project_id" component={ProjectDashboardContainer}>
              <IndexRoute component={ProjectDashboard} />
              <Route path=":resource_type/" component={ResourceContainer}>
                <Route path=":resource_id" component={Resource} />
              </Route>
            </Route>
            <Route path="/organization/:organization_id" component={OrganisationDashboardContainer}>
              <IndexRoute component={OrganisationDashboard} />
            </Route>
          </Route>
        </Router>
      </Provider>),
      document.getElementById('root'),
    );
  });
