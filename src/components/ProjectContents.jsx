import React from 'react';
import PropTypes from 'prop-types';
import fixIt, { options } from 'react-fix-it';

const propTypes = {
  contents: PropTypes.object.isRequired,
};

options.log = (test) => {
  console.warn(test);
};

function ProjectContents(props) {
  const { contents } = props;
  const project_contents = contents.original || {};
  const translationContents = contents.translation || {};
  return (
    <div className="padded-flex">
      <div>
        <h2>Original Project Contents</h2>
        <p data-translation-key="title">Title: { project_contents.title }</p>
        <p data-translation-key="description">Description: { project_contents.description }</p>
        <p data-translation-key="introduction">Introduction: { project_contents.introduction }</p>
        <p>Language: { project_contents.language}</p>
      </div>
      <div>
        <h2>Translation</h2>
        <p>Title: { translationContents.title }</p>
        <p>Description: { translationContents.description }</p>
        <p>Introduction: { translationContents.introduction }</p>
        <p>Language: { translationContents.language}</p>
      </div>
    </div>
  );
}

ProjectContents.propTypes = propTypes;
export default fixIt(ProjectContents);
