import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BaseModal, ModalBody, ModalFooter } from 'pui-react-modals';
import { DefaultButton } from 'pui-react-buttons';
import * as contentsActions from '../ducks/contents';
import ProjectContents from '../components/ProjectContents';
import isElementTranslatable from '../helpers/isElementTranslatable';


const propTypes = {
  actions: PropTypes.object.isRequired,
  contents: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

class ProjectContentsContainer extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      modalOpen: false,
      projectContents: {
        description: '',
        introduction: '',
        title: '',
      },
      translationText: '',
    };
  }

  componentDidMount() {
    const { actions, params } = this.props;
    return actions.fetchProjectContents(params.project_id);
  }

  handleClick(event) {
    if (isElementTranslatable(event)) {
      const projectContents = (event.target.dataset.translationProjectContents)
      ? event.target.dataset.translationProjectContents
      : null;

      this.setState({
        modalOpen: true,
        projectContents: {
          description: projectContents.description,
          introduction: projectContents.introduction,
          title: projectContents.title,
        },
        translationText: event.target.textContent,
      });
    } else {
      alert('This element does not support translations');
    }
  }

  render() {
    const { contents } = this.props;
    return (
      <div>
        <BaseModal
          acquireFocus={false}
          title="Modal Title"
          show={this.state.modalOpen}
          onHide={() => this.setState({ modalOpen: false })}
        >
          <ModalBody>
            <p>{this.state.translationText}</p>
            <input autoFocus placeholder="Translate some text" />
          </ModalBody>
          <ModalFooter>
            <DefaultButton
              onClick={() => this.setState({ modalOpen: false })}
            >
              Close
            </DefaultButton>
          </ModalFooter>
        </BaseModal>
        <div onClick={this.handleClick}>
          <ProjectContents contents={contents} />
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
