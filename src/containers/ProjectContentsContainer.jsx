import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BaseModal, ModalBody } from 'pui-react-modals';
import { DefaultButton } from 'pui-react-buttons';
import * as contentsActions from '../ducks/contents';
import ProjectContents from '../components/ProjectContents';

const propTypes = {
  actions: PropTypes.object.isRequired,
  contents: PropTypes.object.isRequired,
};

class ProjectContentsContainer extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      modalOpen: false,
    };
  }
  componentDidMount() {
    const { actions } = this.props;
    return actions.fetchProjectContents();
  }

  handleClick(event) {
    this.setState({
      modalOpen: true,
    });
  }

  render() {
    const { contents } = this.props;
    return (
      <div>
        <BaseModal
          acquireFocus={false}
          title="What a Header!"
          show={this.state.modalOpen}
          onHide={() => this.setState({modalOpen: false})}
        >
          <ModalBody>
            <p>Text in a body</p>
            <input autoFocus placeholder="Translate some text" />
          </ModalBody>
        </BaseModal>
        <div  onClick={this.handleClick}>
          <ProjectContents modal={this.state.modalOpen} contents={contents} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  contents: state.contents,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(contentsActions, dispatch),
});

ProjectContentsContainer.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectContentsContainer);
