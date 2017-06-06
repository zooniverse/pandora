import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contentsActions from '../ducks/resource';
import { BaseModal, ModalBody, ModalFooter } from 'pui-react-modals';
import { DefaultButton } from 'pui-react-buttons';

const propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.node,
  contents: PropTypes.object,
  params: PropTypes.shape({
    project_id: PropTypes.string
  })
};

class ProjectContentsContainer extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      modalOpen: false,
      translationText: ''
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    const type = this.props.routes[2].path;
    const id = type ? this.props.params.resource_id : this.props.params.project_id;
    return actions.fetchResource(id, type);
  }

  handleClick(event) {
    this.setState({
      modalOpen: true,
      translationText: event.target.textContent
    });
  }

  render() {
    const { resource } = this.props;
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
            <input autoFocus placeholder="Translate some text" />
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
