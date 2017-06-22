import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fixIt, { options } from 'react-fix-it';

const propTypes = {
  contents: PropTypes.object.isRequired,
};

options.log = (test) => {
  console.warn(test);
};

class WorkflowContents extends Component {

  render() {
    const { contents } = this.props;
    const workflow_contents = contents.original.length ? contents.original[0] : {strings: []};
    console.log(workflow_contents)
    const strings = [];
    for (const key in workflow_contents.strings) {
      strings.push(<p key={key}><b>{key}</b> {workflow_contents.strings[key]}</p>);
    }
    return (
      <div>
        <h2>Workflow Contents</h2>
        {strings}
      </div>
    );
  }
}

WorkflowContents.propTypes = propTypes;
export default fixIt(WorkflowContents);
