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

function WorkflowContents(props) {
  const { contents } = props;
  const original = contents.original || { strings: {} };
  const translation = contents.translation || { strings: {} };
  const keys = original.strings ? Object.keys(original.strings) : [];
  return (
    <div>
      <h2>Workflow Contents</h2>
      <p>Language: {translation.language}</p>
      {keys.map((key) => {
        return (
          <TranslationField
            key={key}
            translationKey="strings"
            translationSubkey={key}
            original={original.strings[key]}
            translation={translation.strings[key]}
          >
            {key}
          </TranslationField>
        );
      })}
    </div>
  );
}

WorkflowContents.propTypes = propTypes;
export default fixIt(WorkflowContents);
