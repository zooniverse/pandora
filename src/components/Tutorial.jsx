import React from 'react';
import PropTypes from 'prop-types';
import fixIt from 'react-fix-it';
import TranslationField from './TranslationField';

function Tutorial(props) {
  const { contents } = props;
  const original = contents.original || { steps: [] };
  const translation = contents.translation || original;
  return (
    <div>
      <h2>Tutorial</h2>
      {original.steps && original.steps.map((step, key) =>
        (
          <TranslationField
            key={key}
            isMarkdown={true}
            translationKey={`steps.${key}.content`}
            original={step.content}
            translation={translation.steps[key].content}
          >
            Step {key}
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
  }).isRequired
};

export default fixIt(Tutorial);
