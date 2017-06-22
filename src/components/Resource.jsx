import React from 'react';
import PropTypes from 'prop-types';
import fixIt, { options } from 'react-fix-it';
import Tutorial from './Tutorial';
import WorkflowContents from './WorkflowContents';

const resources = {
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
