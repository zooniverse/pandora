import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
  }
  componentDidMount() {
    const { actions } = this.props;
    return actions.fetchProjectContents(this.props.params.project_id);
  }

  handleClick(event) {
    console.log('====================================');
    console.log(event.target);
    console.log('====================================');
  }

  render() {
    const { contents } = this.props;
    return (
      <div onClick={this.handleClick}>
        <ProjectContents contents={contents} />
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
