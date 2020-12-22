import React from 'react';
import PropTypes from 'prop-types';
import AppLink from './AppLink';
import ResourceContainer from '../containers/ResourceContainer';
import ProjectContents from './ProjectContents';

function TutorialLink(props) {
  const { tutorial, project } = props;
  return (
    <AppLink
      label={`${tutorial.id }: ${tutorial.display_name}`}
      to={`/project/${project.id}/tutorial/${tutorial.id}`}
    />
  );
}

TutorialLink.propTypes = {
  project: PropTypes.object.isRequired,
  tutorial: PropTypes.object.isRequired
};

function ProjectDashboard(props) {
  const { fieldguides, language, project, tutorials, workflows } = props;
  const params = {
    resource_type: 'project',
    resource_id: props.params.project_id
  }
  return (
    <div>
      {language ?
        <ResourceContainer {...props} params={params}>
          <ProjectContents />
        </ResourceContainer> :
        <p>Select a language to start.</p>
      }
      { language &&
        <div>
          <h3>Workflows</h3>
          <ul>
            {workflows.map(workflow =>
              (
                <li key={workflow.id}>
                  <AppLink
                    label={workflow.display_name}
                    to={`/project/${project.id}/workflow/${workflow.id}`}
                  />
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
                    <AppLink
                      label={`${fieldguide.id}: ${fieldguide.display_name}`}
                      to={`/project/${project.id}/field_guide/${fieldguide.id}`}
                    />
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
                    <AppLink
                      label={`${page.id}: ${page.title}`}
                      to={`/project/${project.id}/project_page/${page.id}`}
                    />
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
