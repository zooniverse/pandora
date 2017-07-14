import React from 'react';
import PropTypes from 'prop-types';
import fixIt, { options } from 'react-fix-it';
import FieldGuide from './FieldGuide';
import ProjectPage from './ProjectPage';
import Tutorial from './Tutorial';
import WorkflowContents from './WorkflowContents';

const resources = {
  field_guides: FieldGuide,
  mini_courses: Tutorial,
  project_pages: ProjectPage,
  tutorials: Tutorial,
  workflows: WorkflowContents
};

const propTypes = {
  contents: PropTypes.object.isRequired,
  params: PropTypes.shape({
    resource_type: PropTypes.string
  })
};

options.log = (test) => {
  console.warn(test);
};

function Resource(props) {
  const { contents } = props;
  const ResourceViewer = resources[props.params.resource_type];
  return (<ResourceViewer contents={contents} />);
}

Resource.propTypes = propTypes;
export default fixIt(Resource);
