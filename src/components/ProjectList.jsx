import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fixIt, { options } from 'react-fix-it';
import { Link } from 'react-router';

const propTypes = {
  projects: PropTypes.object.isRequired,
};

function ProjectListItem(props) {
  return(
    <li key={props.project.id}>
      <Link to={`/project/${props.project.id}`} >{props.project.display_name}</Link>
      <h3>Workflows</h3>
      <ul>
      {props.project.links.workflows.map(workflow => {
        return (
          <li key={workflow}>
            <Link to={`/project/${props.project.id}/workflow/${workflow}`}>
              {workflow}
            </Link>
          </li>
        );
      })}
      </ul>
      
    </li>
  );
}
class ProjectList extends Component {

  render() {
    const { projects } = this.props;
    return (
      <div>
        <h2>Projects</h2>
        <ul>
          {projects.data.map(project => <ProjectListItem key={project.id} project={project} />)}
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
