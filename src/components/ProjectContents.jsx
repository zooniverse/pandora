import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from 'markdownz';
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
        <p data-translation-key="researcher_quote">Researcher quote: { project_contents.researcher_quote }</p>
        <p>Language: { project_contents.language}</p>
      </div>
      <div>
        <h2>Translation</h2>
        <Markdown content={`Title: ${translationContents.title}`} />
        <Markdown content={`Description: ${translationContents.description}`} />
        <Markdown content={`Introduction: ${translationContents.introduction}`} />
        <Markdown content={`Researcher quote: ${translationContents.researcher_quote}`} />
        <p>Language: { translationContents.language}</p>
      </div>
    </div>
  );
}

ProjectContents.propTypes = propTypes;
export default fixIt(ProjectContents);
