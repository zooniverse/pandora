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
      <ul>
      {project.links.workflows.map((id) => {
        return (
          <li key={id}>
            <Link to={`/project/${project.id}/workflow/${id}`}>{id}</Link>
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
    links: {
      workflows: []
    }
  }
};

export default fixIt(ProjectDashboard);
