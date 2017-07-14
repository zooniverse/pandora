import React from 'react';
import PropTypes from 'prop-types';
import fixIt from 'react-fix-it';
import { Link } from 'react-router';
import ProjectContentsContainer from '../containers/ProjectContentsContainer';
import ProjectContents from './ProjectContents';

const propTypes = {
  fieldguides: PropTypes.array.isRequired,
  language: PropTypes.string,
  pages: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
  translations: PropTypes.array.isRequired,
  tutorials: PropTypes.array.isRequired,
  workflows: PropTypes.array.isRequired,
};

function TutorialLink(props) {
  const { tutorial, project } = props;
  switch (tutorial.kind) {
    case 'mini-course':
      return (
        <Link to={`/project/${project.id}/mini_courses/${tutorial.links.workflows[0]}`}>{tutorial.id}: {tutorial.display_name}</Link>
      );
    case 'tutorial':
    default:
      return (<Link to={`/project/${project.id}/tutorials/${tutorial.links.workflows[0]}`}>{tutorial.id}: {tutorial.display_name}</Link>
      );
  }
}

TutorialLink.propTypes = {
  project: PropTypes.object.isRequired,
  tutorial: PropTypes.object.isRequired
};

function ProjectDashboard(props) {
  const { fieldguides, project, translations, tutorials, workflows } = props;
  return (
    <div>
      <h3>Translations</h3>
      <ul>
        {translations.map((translation) => {
          return (
            <li key={translation.id}>
              {translation.language}
            </li>
          );
        })}
      </ul>
      <ProjectContentsContainer {...props}>
        <ProjectContents />
      </ProjectContentsContainer>
      <h3>Workflows</h3>
      <ul>
        {workflows.map((workflow) => {
          return (
            <li key={workflow.id}>
              <Link to={`/project/${project.id}/workflows/${workflow.id}`}>{workflow.display_name}</Link>
            </li>
          );
        })}
      </ul>
      <h3>Tutorials</h3>
      <ul>
        {tutorials.map((tutorial) => {
          return (
            <li key={tutorial.id}>
              <TutorialLink project={project} tutorial={tutorial} />
            </li>
          );
        })}
      </ul>
      <h3>Field Guides</h3>
      <ul>
        {fieldguides.map((fieldguide) => {
          return (
            <li key={fieldguide.id}>
              <Link to={`/project/${project.id}/field_guides/${fieldguide.id}`}>{fieldguide.id}: {fieldguide.display_name}</Link>
            </li>
          );
        })}
      </ul>
      <h3>Pages</h3>
      <ul>
        {props.pages.map((page) => {
          return (
            <li key={page.id}>
              <Link to={`/project/${project.id}/project_pages/${page.url_key}`}>{page.id}: {page.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

ProjectDashboard.propTypes = propTypes;

ProjectDashboard.defaultProps = {
  language: 'en',
  project: {
    tutorials: [],
    workflows: []
  }
};

export default fixIt(ProjectDashboard);
