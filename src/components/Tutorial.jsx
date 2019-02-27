import React from 'react';
import PropTypes from 'prop-types';
import TranslationField from './TranslationField';

function Tutorial(props) {
  const { contents, language } = props;
  const original = contents.original || { strings: {} };
  const translation = contents.translation || original;
  const fields = Object.keys(original.strings);
  function isOutdated(field) {
    return translation.string_versions && translation.string_versions[field] < original.string_versions[field];
  }
  return (
    <div>
      <h2>Tutorial</h2>
      {fields.map(field =>
        (
          <TranslationField
            key={field}
            isMarkdown={true}
            translationKey={field}
            language={language}
            original={original.strings[field]}
            translation={translation.strings[field]}
            isOutdated={isOutdated(field)}
          >
            {field}
          </TranslationField>
        )
      )}
    </div>
  );
}

Tutorial.propTypes = {
  contents: PropTypes.PropTypes.shape({
    original: PropTypes.object,
    translation: PropTypes.object
  }).isRequired,
  language: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }).isRequired
};

export default Tutorial;
