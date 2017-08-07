import React from 'react';
import PropTypes from 'prop-types';
import fixIt, { options } from 'react-fix-it';
import TranslationField from './TranslationField';

const propTypes = {
  contents: PropTypes.object.isRequired,
};

options.log = (test) => {
  console.warn(test);
};

function ProjectContents(props) {
  const { contents } = props;
  const original = contents.original || {};
  const translation = contents.translation || {};
  return (
    <div>
      <h2>Project</h2>
      <TranslationField
        translationKey="title"
        original={original.title}
        translation={translation.title}
      >
        Title
      </TranslationField>
      <TranslationField
        translationKey="description"
        original={original.description}
        translation={translation.description}
      >
        Description
      </TranslationField>
      <TranslationField
        isMarkdown={true}
        translationKey="introduction"
        original={original.introduction}
        translation={translation.introduction}
      >
        Introduction
      </TranslationField>
      <TranslationField
        translationKey="researcher_quote"
        original={original.researcher_quote}
        translation={translation.researcher_quote}
      >
        Researcher quote
      </TranslationField>
    </div>
  );
}

ProjectContents.propTypes = propTypes;
export default fixIt(ProjectContents);
