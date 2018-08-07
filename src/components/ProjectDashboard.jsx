import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ProjectContentsContainer from '../containers/ProjectContentsContainer';
import ProjectContents from './ProjectContents';

function TutorialLink(props) {
  const { tutorial, project } = props;
  return (
    <Link
      to={`/project/${project.id}/tutorial/${tutorial.id}`}
    >
      {tutorial.id}: {tutorial.display_name}
    </Link>
  );
}

TutorialLink.propTypes = {
  project: PropTypes.object.isRequired,
  tutorial: PropTypes.object.isRequired
};

function ProjectDashboard(props) {
  const { fieldguides, language, project, tutorials, workflows } = props;
  return (
    <div>
      {language ?
        <ProjectContentsContainer {...props}>
          <ProjectContents />
        </ProjectContentsContainer> :
        <p>Select a language to start.</p>
      }
      { language &&
        <div>
          <h3>Workflows</h3>
          <ul>
            {workflows.map(workflow =>
              (
                <li key={workflow.id}>
                  <Link to={`/project/${project.id}/workflow/${workflow.id}`}>{workflow.display_name}</Link>
                </li>
              )
            )}
          </ul>
          <h3>Tutorials</h3>
          <ul>
            {tutorials
              .filter(tutorial => (tutorial.language === project.primary_language))
              .map(tutorial =>
                (
                  <li key={tutorial.id}>
                    <TutorialLink project={project} tutorial={tutorial} />
                  </li>
                )
              )}
          </ul>
          <h3>Field Guides</h3>
          <ul>
            {fieldguides
              .filter(fieldguide => (fieldguide.language === project.primary_language))
              .map(fieldguide =>
                (
                  <li key={fieldguide.id}>
                    <Link
                      to={`/project/${project.id}/field_guide/${fieldguide.id}`}
                    >
                      {fieldguide.id}: {fieldguide.display_name}
                    </Link>
                  </li>
                )
              )}
          </ul>
          <h3>Pages</h3>
          <ul>
            {props.pages
              .filter(page => page.content)
              .map(page =>
                (
                  <li key={page.id}>
                    <Link
                      to={`/project/${project.id}/project_page/${page.id}`}
                    >
                      {page.id}: {page.title}
                    </Link>
                  </li>
                )
              )}
          </ul>
        </div>
      }
    </div>
  );
}

ProjectDashboard.propTypes = {
  fieldguides: PropTypes.arrayOf(PropTypes.object).isRequired,
  language: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  pages: PropTypes.arrayOf(PropTypes.object).isRequired,
  project: PropTypes.object.isRequired,
  tutorials: PropTypes.arrayOf(PropTypes.object).isRequired,
  workflows: PropTypes.arrayOf(PropTypes.object).isRequired
};


ProjectDashboard.defaultProps = {
  language: {
    label: '',
    value: ''
  },
  project: {
    tutorials: [],
    workflows: []
  }
};

export default ProjectDashboard;
