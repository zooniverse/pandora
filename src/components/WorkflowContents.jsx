import React from 'react';
import PropTypes from 'prop-types';
import TranslationField from './TranslationField';

function WorkflowContents(props) {
  const { contents } = props;
  const original = contents.original || { strings: {} };
  const translation = contents.translation || { strings: {} };
  const keys = original.strings.tasks ? Object.keys(original.strings.tasks) : [];
  return (
    <div>
      <h2>Workflow Contents</h2>
      <p>Language: {translation.language}</p>
      {keys.map(key =>
        (
          <TranslationField
            key={key}
            translationKey="tasks"
            translationSubkey={key}
            original={original.strings.tasks[key]}
            translation={translation.strings.tasks[key]}
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
  }).isRequired
};

export default WorkflowContents;
