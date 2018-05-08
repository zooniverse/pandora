import React from 'react';
import PropTypes from 'prop-types';
import FieldGuide from './FieldGuide';
import ProjectPage from './ProjectPage';
import Tutorial from './Tutorial';
import WorkflowContents from './WorkflowContents';

const resources = {
  field_guide: FieldGuide,
  mini_course: Tutorial,
  project_page: ProjectPage,
  tutorial: Tutorial,
  workflow: WorkflowContents
};

function Resource(props) {
  const { contents, language } = props;
  const ResourceViewer = resources[props.params.resource_type];
  return (contents.translation && <ResourceViewer contents={contents} language={language} />);
}

Resource.propTypes = {
  contents: PropTypes.object.isRequired,
  language: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }).isRequired,
  params: PropTypes.shape({
    resource_type: PropTypes.string
  }).isRequired
};

Resource.defaultProps = {
  language: {
    label: 'English',
    value: 'en'
  }
}

export default Resource;
