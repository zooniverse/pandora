import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from 'markdownz';

function TranslationField(props) {
  const original = props.isMarkdown ? <Markdown>{props.original}</Markdown> : props.original;
  const translation = props.isMarkdown ? <Markdown>{props.translation}</Markdown> : props.translation;
  return (
    <div>
      <h3>
        {props.children}
        <button
          data-markdown={props.isMarkdown}
          data-translation-key={props.translationKey}
          data-translation-subkey={props.translationSubkey}
        >
          Translate
        </button>
      </h3>
      <p>{ original }</p>
      <p>{ translation }</p>
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
