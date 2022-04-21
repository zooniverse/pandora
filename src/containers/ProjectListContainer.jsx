import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchProjects } from '../ducks/projects';

import ProjectList from '../components/ProjectList';

class ProjectListContainer extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchProjects());
  }

  render() {
    const { projects } = this.props;
    return (
      <ProjectList projects={projects} />
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects
});

ProjectListContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  projects: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
};

ProjectListContainer.defaultProps = {
  projects: {
    data: []
  }
};

export default connect(mapStateToProps)(ProjectListContainer);
