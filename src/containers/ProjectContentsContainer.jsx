import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BaseModal, ModalBody, ModalFooter } from 'pui-react-modals';
import { DefaultButton } from 'pui-react-buttons';
import * as contentsActions from '../ducks/resource';
import isElementTranslatable from '../helpers/isElementTranslatable';

const propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.node,
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
    this.state = {
      field: '',
      subfield: '',
      modalOpen: false,
      translationText: ''
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

  handleChange(event) {
    this.setState({
      translationText: event.target.value,
    });
  }

  handleClick(event) {
    if (isElementTranslatable(event)) {
      const field = event.target.getAttribute('data-translation-key');
      const subfield = event.target.getAttribute('data-translation-subkey');
      const { original, translation } = this.props.resource;
      let fieldText;
      if (subfield && subfield.length) {
        fieldText = original[field][subfield];
      } else {
        fieldText = original[field];
      }
      if (translation) {
        this.setState({
          field,
          subfield,
          fieldText,
          modalOpen: true
        });
      } else {
        alert('Please select a language');
      }
    } else {
      alert('This element does not support translations');
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
            <MarkdownEditor
              autoFocus
              name={this.state.field}
              onChange={this.handleChange}
              placeholder="Translate some text"
              previewing="false"
              value={this.state.translationText}
            />
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
