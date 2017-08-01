import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from 'markdownz';
import FormEdit from 'grommet/components/icons/base/FormEdit';

function TranslationField(props) {
  const original = props.isMarkdown ? <Markdown>{props.original}</Markdown> : <p>{props.original}</p>;
  const translation = props.isMarkdown ? <Markdown>{props.translation}</Markdown> : <p>{props.translation}</p>;
  return (
    <div className="field-editor">
      <h3>
        {props.children}
        <button
          data-markdown={props.isMarkdown}
          data-translation-key={props.translationKey}
          data-translation-subkey={props.translationSubkey}
        >
          <FormEdit size="xsmall" />
          Translate
        </button>
      </h3>
      { original }
      { translation }
    </div>
  );
}

TranslationField.propTypes = {
  children: PropTypes.node.isRequired,
  isMarkdown: PropTypes.bool,
  original: PropTypes.string,
  translation: PropTypes.string,
  translationKey: PropTypes.string.isRequired,
  translationSubkey: PropTypes.string
};

TranslationField.defaultProps = {
  isMarkdown: undefined,
  original: '',
  translation: ''
};

export default TranslationField;
