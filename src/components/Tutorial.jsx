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

function Tutorial(props) {
  const { contents } = props;
  const original = contents.original || { steps: [] };
  const translation = contents.translation || original;
  return (
    <div>
      <h2>Tutorial</h2>
      {original.steps && original.steps.map((step, key) => {
        return (
          <TranslationField
            key={key}
            isMarkdown={true}
            translationKey={`steps.${key}.content`}
            original={step.content}
            translation={translation.steps[key].content}
          >
            Step {key}
          </TranslationField>
        );
      })}
    </div>
  );
}

Tutorial.propTypes = propTypes;
export default fixIt(Tutorial);
