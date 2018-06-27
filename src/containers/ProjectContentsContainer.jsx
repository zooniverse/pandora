import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contentsActions from '../ducks/resource';
import isElementTranslatable from '../helpers/isElementTranslatable';
import TranslationEditor from '../components/TranslationEditor';

class ProjectContentsContainer extends Component {

  constructor() {
    super();
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      field: '',
      fieldText: '',
      modalOpen: false,
      supportsMarkdown: false,
      translationText: '',
      previewing: false
    };
  }

  componentWillMount() {
    const { actions } = this.props;
    actions.resetTranslations();
  }

  componentDidMount() {
    const { actions, params, project, language } = this.props;
    const type = params.resource_type;
    const id = type ? params.resource_id : params.project_id;
    actions.fetchTranslations(id, type, project, language);
  }

  componentWillReceiveProps(newProps) {
    const { actions, params, resource, language } = newProps;
    if (newProps.language !== this.props.language && newProps.language.value !== newProps.project.primary_language) {
      const type = params.resource_type;
      const { original, translations } = resource;
      actions.selectTranslation(original, translations, type, language);
    }
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  handleChange(event) {
    this.setState({
      previewing: false,
      translationText: event.target.value
    });
  }

  handleClick(event) {
    if (isElementTranslatable(event.target)) {
      const field = event.target.getAttribute('data-translation-key');
      const supportsMarkdown = event.target.getAttribute('data-markdown');
      const { original, translation } = this.props.resource;
      if (translation) {
        const fieldText = original.strings[field];
        const translationText = translation.strings[field];
        this.setState({
          field,
          fieldText,
          modalOpen: true,
          supportsMarkdown,
          translationText
        });
      } else {
        alert('Please select a language');
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { field, translationText } = this.state;
    const { actions, resource } = this.props;
    const original = resource.original;
    const translation = resource.translation;
    actions.updateTranslation(original, translation, field, translationText);
    this.closeModal();
  }

  render() {
    const { language, project, resource } = this.props;
    const { field, fieldText, translationText, modalOpen, supportsMarkdown } = this.state;
    return (
      <div>
        {modalOpen &&
          <TranslationEditor
            isMarkdown={supportsMarkdown}
            language={this.props.language}
            onChange={this.handleChange}
            onClose={this.closeModal}
            onSave={this.handleSubmit}
            original={fieldText}
            translation={translationText}
            translationKey={field}
          />
        }
        <div onClick={this.handleClick}>
          {React.cloneElement(this.props.children, { contents: resource, language, project })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  resource: state.resource
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(contentsActions, dispatch)
});

ProjectContentsContainer.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  children: PropTypes.node,
  language: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  params: PropTypes.shape({
    project_id: PropTypes.string,
    resource_id: PropTypes.string,
    resource_type: PropTypes.string
  }).isRequired,
  project: PropTypes.shape({
    data: PropTypes.object,
    fieldguides: PropTypes.array,
    language: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    pages: PropTypes.array,
    tutorials: PropTypes.array,
    workflows: PropTypes.array
  }).isRequired,
  resource: PropTypes.object.isRequired
};

ProjectContentsContainer.defaultProps = {
  children: null,
  language: {
    label: '',
    value: ''
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectContentsContainer);
