import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MarkdownEditor } from 'markdownz';
import { BaseModal, ModalBody, ModalFooter } from 'pui-react-modals';
import { DefaultButton } from 'pui-react-buttons';
import * as contentsActions from '../ducks/resource';
import isElementTranslatable from '../helpers/isElementTranslatable';

class ProjectContentsContainer extends Component {

  constructor() {
    super();
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.state = {
      field: '',
      fieldText: '',
      subfield: '',
      modalOpen: false,
      supportsMarkdown: false,
      translationText: ''
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
      translationText: event.target.value
    });
  }

  handleClick(event) {
    if (isElementTranslatable(event.target)) {
      const field = event.target.getAttribute('data-translation-key');
      const subfield = event.target.getAttribute('data-translation-subkey');
      const supportsMarkdown = event.target.getAttribute('data-markdown');
      const { original, translation } = this.props.resource;
      if (translation) {
        let fieldText;
        let translationText;
        if (subfield && subfield.length) {
          fieldText = original.strings[field][subfield];
          translationText = translation.strings[field][subfield];
        } else {
          fieldText = original.strings[field];
          translationText = translation.strings[field];
        }
        this.setState({
          field,
          subfield,
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
    const { field, subfield, translationText } = this.state;
    const { actions, resource } = this.props;
    const original = resource.original;
    const translation = resource.translation;
    if (subfield && subfield.length) {
      const changes = translation[field];
      changes[subfield] = translationText;
      actions.updateTranslation(original, translation, field, changes);
    } else {
      actions.updateTranslation(original, translation, field, translationText);
    }
    this.closeModal();
  }

  renderInput() {
    const { field, supportsMarkdown, translationText } = this.state;
    if (supportsMarkdown) {
      return (
        <MarkdownEditor
          autoFocus
          name={field}
          onChange={this.handleChange}
          placeholder="Translate some text"
          previewing={false}
          value={translationText}
        />
      );
    } else {
      return (
        <input
          autoFocus
          onChange={this.handleChange}
          placeholder="Translate some text"
          type="text"
          value={translationText}
        />
      );
    }
  }

  render() {
    const { project, resource } = this.props;
    return (
      <div>
        <BaseModal
          acquireFocus={false}
          show={this.state.modalOpen}
          onHide={this.closeModal}
        >
          <ModalBody>
            <h2>Original</h2>
            <p>{this.state.fieldText}</p>
            <h2>Your translation</h2>
            {this.renderInput()}
            <DefaultButton onClick={this.handleSubmit}>
              Submit
            </DefaultButton>
          </ModalBody>
          <ModalFooter>
            <DefaultButton onClick={this.closeModal}>
              Close
            </DefaultButton>
          </ModalFooter>
        </BaseModal>
        <div onClick={this.handleClick}>
          {React.cloneElement(this.props.children, { contents: resource, project })}
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
