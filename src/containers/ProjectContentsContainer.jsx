import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import languages from '../constants/languages';
import * as contentsActions from '../ducks/resource';
import { BaseModal, ModalBody, ModalFooter } from 'pui-react-modals';
import { DefaultButton } from 'pui-react-buttons';
import { Dropdown, DropdownItem } from 'pui-react-dropdowns';

const propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.node,
  params: PropTypes.shape({
    project_id: PropTypes.string,
    resource_id: PropTypes.string,
    resource_type: PropTypes.string
  })
};

class ProjectContentsContainer extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      modalOpen: false,
      translationLanguage: '',
      translationText: ''
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    const type = this.props.params.resource_type;
    const id = type ? this.props.params.resource_id : this.props.params.project_id;
    actions.fetchResource(id, type);
  }

  handleClick(event) {
    this.setState({
      modalOpen: true,
      translationText: event.target.textContent
    });
  }

  handleChange(event) {
    this.setState({
      translationLanguage: event.target.textContent,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('submit');
  }

  render() {
    const { resource } = this.props;
    const renderDropdownItems = languages.map((item) => {
      return (
        <DropdownItem key={item.code} onClick={this.handleChange}>
          {item.name}
        </DropdownItem>
      );
    });
    return (
      <div>
        <BaseModal
          acquireFocus={false}
          title="What a Header!"
          show={this.state.modalOpen}
          onHide={() => this.setState({modalOpen: false})}
        >
          <ModalBody>
            <p>{this.state.translationText}</p>
            <Dropdown split title={this.state.translationLanguage || 'Language'}>
              {renderDropdownItems}
            </Dropdown>
            <input autoFocus placeholder="Translate some text" />
            <DefaultButton onClick={this.handleSubmit}>
              Submit
            </DefaultButton>
          </ModalBody>
          <ModalFooter>
            <DefaultButton onClick={() => this.setState({modalOpen: false})}>
              Close
            </DefaultButton>
          </ModalFooter>
        </BaseModal>
        <div onClick={this.handleClick}>
          {React.cloneElement(this.props.children, { contents: resource })}
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
