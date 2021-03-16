import React from 'react';
import PropTypes from 'prop-types';
import AppLink from './AppLink'

function ProjectListItem(props) {
  return (
    <li key={props.project.id}>
      <AppLink
        label={props.project.display_name}
        to={`/project/${props.project.id}`}
      />
    </li>
  );
}

ProjectListItem.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string,
    display_name: PropTypes.string
  }).isRequired
};

function ProjectList(props) {
  const { projects } = props;
  return (
    <div>
      <h2>Your Projects</h2>
      <ul>
        {projects.data.map(project => <ProjectListItem key={project.id} project={project} />)}
      </ul>
    </div>
  );
}

ProjectList.propTypes = {
  projects: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
};

ProjectList.defaultProps = {
  projects: {
    data: []
  }
};

export default ProjectList;
