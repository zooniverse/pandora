import React from 'react';
import PropTypes from 'prop-types';
import fixIt, { options } from 'react-fix-it';

const propTypes = {
  contents: PropTypes.object.isRequired,
};

options.log = (test) => {
  console.warn(test);
};

function WorkflowContents(props) {
  const { contents } = props;
  const workflow_contents = contents.original || { strings: {} };
  const strings = [];
  const keys = workflow_contents.strings ? Object.keys(workflow_contents.strings) : [];
  keys.map(key => strings.push(<p key={key}><b>{key}</b> {workflow_contents.strings[key]}</p>));
  return (
    <div>
      <h2>Workflow Contents</h2>
      {strings}
    </div>
  );
}

WorkflowContents.propTypes = propTypes;
export default fixIt(WorkflowContents);
