import React from 'react';
import PropTypes from 'prop-types';
import TranslationField from './TranslationField';

function ProjectContents(props) {
  const { contents, language } = props;
  const original = contents.original || { strings: {} };
  const translation = contents.translation || { strings: {} };
  function isOutdated(field) {
    return translation.string_versions && translation.string_versions[field] < original.string_versions[field];
  }
  return (
    <div>
      <h2>Project</h2>
      <TranslationField
        translationKey="title"
        language={language}
        original={original.strings.title}
        translation={translation.strings.title}
        isOutdated={isOutdated('title')}
      >
        Title
      </TranslationField>
      <TranslationField
        translationKey="display_name"
        language={language}
        original={original.strings.display_name}
        translation={translation.strings.display_name}
        isOutdated={isOutdated('display_name')}
      >
        Display Name
      </TranslationField>
      <TranslationField
        translationKey="description"
        language={language}
        original={original.strings.description}
        translation={translation.strings.description}
        isOutdated={isOutdated('description')}
      >
        Description
      </TranslationField>
      <TranslationField
        isMarkdown={true}
        translationKey="introduction"
        language={language}
        original={original.strings.introduction}
        translation={translation.strings.introduction}
        isOutdated={isOutdated('introduction')}
      >
        Introduction
      </TranslationField>
      <TranslationField
        translationKey="researcher_quote"
        language={language}
        original={original.strings.researcher_quote}
        translation={translation.strings.researcher_quote}
        isOutdated={isOutdated('researcher_quote')}
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
  }).isRequired,
  language: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }).isRequired
};
export default ProjectContents;
