import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, IndexRoute, Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import oauth from 'panoptes-client/lib/oauth';

import App from './components/App';
import About from './components/About';
import config from './config';
import configureStore from './store';
import ProjectContentsContainer from './containers/ProjectContentsContainer';
import ProjectContents from './components/ProjectContents';
import ProjectList from './containers/ProjectListContainer';
import WorkflowContents from './components/WorkflowContents';

// Todo: let's find a better way to include Styles,
// currently Styles looks like an unused var to eslint
import Styles from './styles/main.styl'; // eslint-disable-line no-unused-vars

const store = configureStore();

oauth.init(config.panoptesAppId)
  .then(() => {
    ReactDOM.render((
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={ProjectList} />
            <Route path="/project/:project_id" component={ProjectContentsContainer}>
              <IndexRoute component={ProjectContents} />
              <Route path="workflow/:resource_id" component={WorkflowContents} />
            </Route>
            <Route path="/about" component={About} />
          </Route>
        </Router>
      </Provider>),
      document.getElementById('root'),
    );
  });
