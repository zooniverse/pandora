import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MarkdownEditor } from 'markdownz';
import { BaseModal, ModalBody, ModalFooter } from 'pui-react-modals';
import { DefaultButton } from 'pui-react-buttons';
import * as contentsActions from '../ducks/resource';
import isElementTranslatable from '../helpers/isElementTranslatable';

const propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.node,
  language: PropTypes.string.isRequired,
  params: PropTypes.shape({
    project_id: PropTypes.string,
    resource_id: PropTypes.string,
    resource_type: PropTypes.string
  }),
  project: PropTypes.object.isRequired,
  resource: PropTypes.object.isRequired
};

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
      translationText: '',
    };
  }

  componentDidMount() {
    const { actions, params, project, language } = this.props;
    const type = params.resource_type;
    const id = type ? params.resource_id : params.project_id;
    actions.fetchTranslations(id, type, project, language);
  }

  componentWillReceiveProps(newProps) {
    const { actions, params } = this.props;
    if (newProps.language !== this.props.language && newProps.language !== newProps.project.primary_language) {
      const { original, translations } = newProps.resource;
      const type = params.resource_type;
      actions.selectTranslation(original, translations, type, newProps.language);
    }
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }
  
  getTextFromPath(resource, path) {
    path = path.split('.');
    let text = resource;
    while (path.length) {
      text = text[path[0]];
      path.shift();
    }
    return text;
  }

  handleChange(event) {
    this.setState({
      translationText: event.target.value,
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
          fieldText = original[field][subfield];
          translationText = translation[field][subfield];
        } else {
          fieldText = this.getTextFromPath(original, field);
          translationText = this.getTextFromPath(translation, field);
        }
        this.setState({
          field,
          subfield,
          fieldText,
          modalOpen: true,
          supportsMarkdown,
          translationText,
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
    const translation = resource.translation;
    if (subfield && subfield.length) {
      const changes = translation[field];
      changes[subfield] = translationText;
      actions.updateTranslation(translation, field, changes);
    } else {
      actions.updateTranslation(translation, field, translationText);
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

const mapStateToProps = (state) => ({
  resource: state.resource,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(contentsActions, dispatch),
});

ProjectContentsContainer.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectContentsContainer);
