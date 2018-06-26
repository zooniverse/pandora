import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, IndexRoute, Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import oauth from 'panoptes-client/lib/oauth';

import App from './components/App';
import config from './constants/config';
import configureStore from './store';
import ProjectContentsContainer from './containers/ProjectContentsContainer';
import ProjectDashboardContainer from './containers/ProjectDashboardContainer';
import ProjectDashboard from './components/ProjectDashboard';
import ProjectList from './containers/ProjectListContainer';
import Resource from './components/Resource';

// Todo: let's find a better way to include Styles,
// currently Styles looks like an unused var to eslint
import Styles from './styles/main.styl'; // eslint-disable-line no-unused-vars

const store = configureStore();

oauth.init(config.panoptesAppId)
  .then(() => {
    ReactDOM.render((
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={ProjectList} />
            <Route path="/project/:project_id" component={ProjectDashboardContainer}>
              <IndexRoute component={ProjectDashboard} />
              <Route path=":resource_type/" component={ProjectContentsContainer}>
                <Route path=":resource_id" component={Resource} />
              </Route>
            </Route>
          </Route>
        </Router>
      </Provider>),
      document.getElementById('root'),
    );
  });
