import React from 'react';
import PropTypes from 'prop-types';
import TranslationField from './TranslationField';

function WorkflowContents(props) {
  const { contents, language } = props;
  const original = contents.original || { strings: {} };
  const translation = contents.translation || original;
  const keys = original.strings ? Object.keys(original.strings) : [];
  return (
    <div>
      <h2>Workflow Contents</h2>
      <p>Language: {translation.language}</p>
      {keys
        .sort((a, b) => a.localeCompare(b))
        .map(key =>
        (
          <TranslationField
            key={key}
            translationKey={key}
            language={language}
            original={original.strings[key]}
            translation={translation.strings[key]}
          >
            {key}
          </TranslationField>
        )
      )}
    </div>
  );
}

WorkflowContents.propTypes = {
  contents: PropTypes.PropTypes.shape({
    original: PropTypes.object,
    translation: PropTypes.object
  }).isRequired,
  language: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }).isRequired
};

export default WorkflowContents;
