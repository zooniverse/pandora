import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import { Markdown, MarkdownEditor } from 'markdownz';
import { updateTranslation } from '../ducks/resource';

class TranslationEditor extends React.Component {
  constructor(props) {
    super(props);
    const translationText = props.translation ? props.translation : props.original;
    this.state = { translationText };
  }

  componentDidUpdate(prevProps) {
    const { original, translation } = this.props;
    if (prevProps.translation !== translation) {
      const translationText = translation || original;
      this.setState({ translationText });
    }
  }

  onChange(event) {
    this.setState({
      translationText: event.target.value
    });
  }

  save(event) {
    event.preventDefault();
    const { dispatch, resource, translationKey } = this.props;
    const { translationText } = this.state;
    dispatch(updateTranslation(resource.original, resource.translation, translationKey, translationText));
    this.props.onSave(event);
  }

  render() {
    const { isMarkdown, language, onClose, original, translationKey } = this.props;
    const { translationText } = this.state;
    return (
      <Box
        basis="full"
        className="modal-body"
        direction="row"
      >
        <Box
          basis="1/2"
          className="original"
        >
          {isMarkdown ?
            <Markdown>
              {original}
            </Markdown> :
            <p>
              {original}
            </p>
          }
        </Box>
        <Box
          basis="1/2"
          className="translation"
          lang={language.value}
        >
          {isMarkdown ?
            <MarkdownEditor
              autoFocus
              name={translationKey}
              onChange={this.onChange.bind(this)}
              previewing={false}
              value={translationText}
            /> :
            <textarea
              autoFocus
              onChange={this.onChange.bind(this)}
              cols={35}
              rows={4}
              value={translationText}
            />
          }
          <Box
            basis="full"
            direction="row"
            justify="end"
          >
            <Button
              label="Cancel"
              onClick={onClose}
              secondary={true}
            />
            <Button
              label="Save"
              onClick={this.save.bind(this)}
            />
          </Box>
        </Box>
      </Box>
    );
  }
}

TranslationEditor.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  isMarkdown: PropTypes.bool,
  language: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  original: PropTypes.string,
  resource: PropTypes.object.isRequired,
  translation: PropTypes.string,
  translationKey: PropTypes.string.isRequired
};

TranslationEditor.defaultProps = {
  isMarkdown: false,
  language: {
    label: 'English',
    value: 'en'
  },
  onClose: () => true,
  onSave: () => true,
  original: '',
  translation: ''
};

const mapStateToProps = state => ({
  resource: state.resource
});

export default connect(mapStateToProps)(TranslationEditor);
export { TranslationEditor };
