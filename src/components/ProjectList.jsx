import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fixIt, { options } from 'react-fix-it';

const propTypes = {
  projects: PropTypes.object.isRequired,
};

class ProjectList extends Component {

  render() {
    const { projects } = this.props;
    return (
      <div>
        <h2>Projects</h2>
        <ul>
          {projects.data.map(project => <li key={project.id}>{project.display_name}</li>)}
        </ul>
      </div>
    );
  }
}

ProjectList.propTypes = propTypes;

ProjectList.defaultProps = {
  projects: {
    data: []
  }
}

export default fixIt(ProjectList);
