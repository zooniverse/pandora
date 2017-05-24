import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as contentsActions from '../ducks/contents';

import ProjectContents from '../components/ProjectContents';

const propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  contents: PropTypes.object.isRequired,
};

class ProjectContentsContainer extends Component {
  componentDidMount() {
    const { actions } = this.props;
    return actions.fetchProjectContents();
  }
  render() {
    console.log('====================================');
    console.log('this.props.children', this.props.children);
    console.log('====================================');
    const { contents } = this.props;
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        onClick: () => alert('I\'m clicked!'),
      });
    });
    return (
      <ProjectContents children={children} contents={contents} />
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
