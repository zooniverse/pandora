import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import { Markdown, MarkdownEditor } from 'markdownz';
import * as contentsActions from '../ducks/resource';

class TranslationEditor extends React.Component {
  constructor(props) {
    super(props);
    const translationText = props.translation ? props.translation : props.original;
    this.state = { translationText };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.translation !== this.props.translation) {
      const translationText = nextProps.translation ? nextProps.translation : nextProps.original;
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
    const { actions, resource, translationKey } = this.props;
    const { translationText } = this.state;
    actions.updateTranslation(resource.original, resource.translation, translationKey, translationText);
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
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(contentsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TranslationEditor);
export { TranslationEditor };
