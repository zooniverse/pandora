import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'grommet/components/Button';
import Layer from 'grommet/components/Layer';
import { Markdown, MarkdownEditor } from 'markdownz';
import * as contentsActions from '../ducks/resource';

class TranslationEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translationText: props.translation
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.translation !== this.props.translation) {
      this.setState({
        translationText: nextProps.translation
      });
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
      <Layer onClose={onClose} closer={true}>
        <div className="modal-body">
          <div className="original">
            <h2>Original</h2>
            {isMarkdown ?
              <Markdown>
                {original}
              </Markdown> :
              <p>
                {original}
              </p>
            }
          </div>
          <div className="translation">
            <h2>Your translation</h2>
            <div lang={language.value}>
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
            </div>
            <Button
              label="Save"
              onClick={this.save.bind(this)}
            />
          </div>
        </div>
      </Layer>
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
