import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from '../ducks/project';

const propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.node,
  contents: PropTypes.object,
  params: PropTypes.shape({
    project_id: PropTypes.string
  })
};

class ProjectDashboardContainer extends Component {

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchProject(this.props.params.project_id);
  }

  render() {
    const project = this.props.project.data;
    return (
      <div>
        <h2>Project Dashboard</h2>
        {React.cloneElement(this.props.children, { project })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(projectActions, dispatch),
});

ProjectDashboardContainer.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectDashboardContainer);
