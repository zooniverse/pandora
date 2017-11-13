import React from 'react';
import PropTypes from 'prop-types';
import TranslationField from './TranslationField';

function ProjectContents(props) {
  const { contents } = props;
  const original = contents.original || { strings: {} };
  const translation = contents.translation || { strings: {} };
  return (
    <div>
      <h2>Project</h2>
      <TranslationField
        translationKey="title"
        original={original.strings.title}
        translation={translation.strings.title}
      >
        Title
      </TranslationField>
      <TranslationField
        translationKey="description"
        original={original.strings.description}
        translation={translation.strings.description}
      >
        Description
      </TranslationField>
      <TranslationField
        isMarkdown={true}
        translationKey="introduction"
        original={original.strings.introduction}
        translation={translation.strings.introduction}
      >
        Introduction
      </TranslationField>
      <TranslationField
        translationKey="researcher_quote"
        original={original.strings.researcher_quote}
        translation={translation.strings.researcher_quote}
      >
        Researcher quote
      </TranslationField>
    </div>
  );
}

ProjectContents.propTypes = {
  contents: PropTypes.shape({
    original: PropTypes.object,
    translation: PropTypes.object
  }).isRequired
};
export default ProjectContents;
