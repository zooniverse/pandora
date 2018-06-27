import React from 'react';
import PropTypes from 'prop-types';
import Button from 'grommet/components/Button';
import Layer from 'grommet/components/Layer';
import { Markdown, MarkdownEditor } from 'markdownz';

function TranslationEditor(props) {
  return (
    <Layer onClose={props.onClose} closer={true}>
      <div className="modal-body">
        <div className="original">
          <h2>Original</h2>
          {props.isMarkdown ?
            <Markdown>
              {props.original}
            </Markdown> :
            <p>
              {props.original}
            </p>
          }
        </div>
        <div className="translation">
          <h2>Your translation</h2>
          <div lang={props.language.value}>
            {props.isMarkdown ?
              <MarkdownEditor
                autoFocus
                name={props.translationKey}
                onChange={props.onChange}
                previewing={false}
                value={props.translation}
              /> :
              <textarea
                autoFocus
                onChange={props.onChange}
                cols={35}
                rows={4}
              >
                {props.translation}
              </textarea>
            }
          </div>
          <Button
            label="Save"
            onClick={props.onSave}
          />
        </div>
      </div>
    </Layer>
  );
}

TranslationEditor.propTypes = {
  isMarkdown: PropTypes.bool,
  language: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  original: PropTypes.string,
  translation: PropTypes.string,
  translationKey: PropTypes.string.isRequired
};

TranslationEditor.defaultProps = {
  isMarkdown: false,
  language: {
    label: 'English',
    value: 'en'
  },
  onChange: () => true,
  onClose: () => true,
  onSave: () => true,
  original: '',
  translation: ''
};

export default TranslationEditor;
