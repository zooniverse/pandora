import React from 'react';
import PropTypes from 'prop-types';
import TranslationField from './TranslationField';

function FieldGuide(props) {
  const { contents } = props;
  const original = contents.original || { strings: {} };
  const translation = contents.translation || original;
  const fields = Object.keys(original.strings);
  return (
    <div>
      <h2>Field Guide</h2>
      <ul>
        {fields.map(field =>
          (
            <TranslationField
              key={field}
              isMarkdown={true}
              translationKey={field}
              original={original.strings[field]}
              translation={translation.strings[field]}
            >
              {field}
            </TranslationField>
          )
        )}
      </ul>
    </div>
  );
}

FieldGuide.propTypes = {
  contents: PropTypes.shape({
    original: PropTypes.object,
    translation: PropTypes.object
  }).isRequired
};

export default FieldGuide;
