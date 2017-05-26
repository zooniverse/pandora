import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as projectsActions from '../ducks/projects';

import ProjectList from '../components/ProjectList';

const propTypes = {
  actions: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
};

class ProjectListContainer extends Component {

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchProjects();
  }

  render() {
    const { projects } = this.props;
    return (
        <ProjectList projects={projects} />
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projects,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(projectsActions, dispatch),
});

ProjectListContainer.propTypes = propTypes;

ProjectListContainer.defaultProps = {
  projects: {
    data: []
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectListContainer);
