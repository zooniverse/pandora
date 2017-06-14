import React from 'react';
import PropTypes from 'prop-types';
import fixIt from 'react-fix-it';
import { Link } from 'react-router';
import ProjectContentsContainer from '../containers/ProjectContentsContainer';
import ProjectContents from './ProjectContents';

const propTypes = {
  project: PropTypes.object.isRequired,
};

function ProjectDashboard(props) {
  const { project } = props;
  return (
    <div>
      <ProjectContentsContainer {...props}>
        <ProjectContents />
      </ProjectContentsContainer>
      <h3>Workflows</h3>
      <ul>
        {project.workflows.map((workflow) => {
          return (
            <li key={workflow.id}>
              <Link to={`/project/${project.id}/workflows/${workflow.id}`}>{workflow.display_name}</Link>
            </li>
          );
        })}
      </ul>
      <h3>Tutorials</h3>
      <ul>
        {project.tutorials.map((tutorial) => {
          return (
            <li key={tutorial.id}>
              <Link to={`/project/${project.id}/tutorials/${tutorial.id}`}>{tutorial.id}: {tutorial.display_name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

ProjectDashboard.propTypes = propTypes;

ProjectDashboard.defaultProps = {
  project: {
    tutorials: [],
    workflows: []
  }
};

export default fixIt(ProjectDashboard);
