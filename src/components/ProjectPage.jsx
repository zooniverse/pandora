import React from 'react';
import PropTypes from 'prop-types';
import TranslationField from './TranslationField';

function ProjectPage(props) {
  const { contents } = props;
  const original = contents.original.strings || {};
  const translation = contents.translation.strings || original;
  return (
    <div>
      <h2>Project Page</h2>
      <TranslationField
        isMarkdown={false}
        translationKey="title"
        original={original.title}
        translation={translation.title}
      >
        Title
      </TranslationField>
      <TranslationField
        isMarkdown={true}
        translationKey="content"
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
  }).isRequired
};

export default ProjectPage;
