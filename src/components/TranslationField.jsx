import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from 'markdownz';
import FormEdit from 'grommet/components/icons/base/FormEdit';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';

function TranslationField(props) {
  const languageCode = props.language ? props.language.value : undefined;
  const original = props.isMarkdown ? <Markdown>{props.original}</Markdown> : <p>{props.original}</p>;
  const translation = props.isMarkdown ?
    <Markdown>{props.translation}</Markdown> :
    <p>{props.translation}</p>;

  function onClick(e) {
    props.isMarkdown && e.target.setAttribute('data-markdown', props.isMarkdown);
    props.translationKey && e.target.setAttribute('data-translation-key', props.translationKey);
    props.translationSubkey && e.target.setAttribute('data-translation-subkey', props.translationSubkey);
  }

  return (
    <div className="field-editor">
      <Heading
        tag="h3"
      >
        {props.children}
      </Heading>
      { original }
      <div lang={languageCode}>
        { translation }
      </div>
      {(props.original.length > 0) &&
        <Button
          data-markdown={props.isMarkdown}
          data-translation-key={props.translationKey}
          data-translation-subkey={props.translationSubkey}
          icon={<FormEdit size="small" />}
          label="Translate"
          onClick={onClick}
        />
      }
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
  translation: '',
  translationSubkey: undefined
};

export default TranslationField;
