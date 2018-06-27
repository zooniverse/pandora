import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from 'markdownz';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormEdit from 'grommet/components/icons/base/FormEdit';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import TranslationEditor from './TranslationEditor';
import * as contentsActions from '../ducks/resource';

class TranslationField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
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

  save(event, newTranslation) {
    event.preventDefault();
    const { translationKey } = this.props;
    const { actions, resource } = this.props;
    actions.updateTranslation(resource.original, resource.translation, translationKey, newTranslation);
    this.closeEditor();
  }

  render() {
    const { editing, translationText } = this.state;
    const { children, isMarkdown, language, original, translation, translationKey } = this.props;
    const languageCode = language ? language.value : undefined;
    const originalFormatted = isMarkdown ? <Markdown>{original}</Markdown> : <p>{original}</p>;
    const translationFormatted = isMarkdown ? <Markdown>{translation}</Markdown> : <p>{translation}</p>;

    return (
      <div className="field-editor">
        <Heading
          tag="h3"
        >
          {children}
        </Heading>
        { originalFormatted }
        <div lang={languageCode}>
          { translationFormatted }
        </div>
        {(original.length > 0) &&
          <Button
            icon={<FormEdit size="small" />}
            label="Translate"
            onClick={language ? this.edit.bind(this) : undefined}
          />
        }
        {editing &&
          <TranslationEditor
            isMarkdown={isMarkdown}
            language={language}
            onChange={this.onChange.bind(this)}
            onClose={this.closeEditor.bind(this)}
            onSave={this.save.bind(this)}
            original={original}
            translation={translationText}
            translationKey={translationKey}
          />
        }
      </div>
    );
  }
}

TranslationField.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  children: PropTypes.node.isRequired,
  isMarkdown: PropTypes.bool,
  language: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  original: PropTypes.string,
  resource: PropTypes.object.isRequired,
  translation: PropTypes.string,
  translationKey: PropTypes.string.isRequired
};

TranslationField.defaultProps = {
  isMarkdown: undefined,
  language: {
    label: 'English',
    value: 'en'
  },
  original: '',
  translation: ''
};

const mapStateToProps = state => ({
  resource: state.resource
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(contentsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TranslationField);
export { TranslationField };

