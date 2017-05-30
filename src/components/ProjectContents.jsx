import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fixIt, { options } from 'react-fix-it';

const propTypes = {
  contents: PropTypes.object.isRequired,
};

options.log = (test) => {
  console.warn(test);
};

class ProjectContents extends Component {

  render() {
    const { contents } = this.props;
    const project_contents = contents.data.length ? contents.data[0] : {};
    return (
      <div>
        <h2>Project Contents</h2>
        <p data-translation-project-contents={project_contents}>Title: { project_contents.title }</p>
        <p data-translation-project-contents={project_contents}>Description: { project_contents.description }</p>
        <p data-translation-project-contents={project_contents}>Introduction: { project_contents.introduction }</p>
        <p>Language: { project_contents.language}</p>
      </div>
    );
  }
}

ProjectContents.propTypes = propTypes;
export default fixIt(ProjectContents);
