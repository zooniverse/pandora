import React from 'react';
import PropTypes from 'prop-types';
import TranslationField from './TranslationField';

function ProjectPage(props) {
  const { contents, language } = props;
  const original = contents.original.strings || {};
  const translation = contents.translation.strings || original;
  return (
    <div>
      <h2>Project Page</h2>
      <TranslationField
        isMarkdown={false}
        translationKey="title"
        language={language}
        original={original.title}
        translation={translation.title}
      >
        Title
      </TranslationField>
      <TranslationField
        isMarkdown={true}
        translationKey="content"
        language={language}
        original={original.content}
        translation={translation.content}
      >
        Content
      </TranslationField>
    </div>
  );
}

ProjectPage.propTypes = {
  contents: PropTypes.shape({
    original: PropTypes.object
  }).isRequired,
  language: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }).isRequired
};

export default ProjectPage;
