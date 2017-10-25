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
  const { contents } = props;
  const ResourceViewer = resources[props.params.resource_type];
  return (contents.translation && <ResourceViewer contents={contents} />);
}

Resource.propTypes = {
  contents: PropTypes.object.isRequired,
  params: PropTypes.shape({
    resource_type: PropTypes.string
  }).isRequired
};

export default Resource;
