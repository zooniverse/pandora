import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from 'markdownz';
import { FormEdit } from 'grommet-icons';
import { Box, Button, Heading } from 'grommet';
import TranslationEditor from './TranslationEditor';

class TranslationField extends React.Component {
  constructor() {
    super();
    this.state = {
      editing: false
    };
  }

  closeEditor() {
    this.setState({
      editing: false
    });
  }

  edit() {
    this.setState({
      editing: true
    });
  }

  save() {
    this.closeEditor();
  }

  render() {
    const { editing } = this.state;
    const { children, isMarkdown, language, original, translation, translationKey } = this.props;
    const languageCode = language ? language.value : undefined;
    const originalFormatted = isMarkdown ? <Markdown>{original}</Markdown> : <p>{original}</p>;
    const translationFormatted = isMarkdown ? <Markdown>{translation}</Markdown> : <p>{translation}</p>;
    const hasText = original?.length > 0 || translation?.length > 0

    return (
      <Box className="field-editor">
        <Box
          basis="full"
          direction="row"
        >
          <Box
            basis="3/4"
          >
            <Heading
              basis="3/4"
              level="3"
            >
              {children}
              {this.props.isOutdated ? ' (Out of date)' : null}
            </Heading>
          </Box>
          <Box>
            {(!editing && hasText) &&
              <Button
                fill={false}
                icon={<FormEdit size="small" />}
                label="Translate"
                onClick={language ? this.edit.bind(this) : undefined}
              />
            }
          </Box>
        </Box>
        {editing ?
          <TranslationEditor
            isMarkdown={isMarkdown}
            language={language}
            onClose={this.closeEditor.bind(this)}
            onSave={this.save.bind(this)}
            original={original}
            translation={translation}
            translationKey={translationKey}
          /> :
          <Box
            basis="full"
            className={this.props.isOutdated ? 'outdated' : undefined}
            direction="row"
          >
            <Box
              basis="1/2"
            >
              { originalFormatted }
            </Box>
            <Box
              basis="1/2"
              lang={languageCode}
            >
              { translationFormatted }
            </Box>
          </Box>
        }
      </Box>
    );
  }
}

TranslationField.propTypes = {
  children: PropTypes.node.isRequired,
  isMarkdown: PropTypes.bool,
  isOutdated: PropTypes.bool,
  language: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  original: PropTypes.string,
  translation: PropTypes.string,
  translationKey: PropTypes.string.isRequired
};

TranslationField.defaultProps = {
  isMarkdown: undefined,
  isOutdated: false,
  language: {
    label: 'English',
    value: 'en'
  },
  original: '',
  translation: ''
};

export default TranslationField;

