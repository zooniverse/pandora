import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import languages from '../constants/languages';
import * as projectActions from '../ducks/project';
import { DefaultButton } from 'pui-react-buttons';
import { Dropdown, DropdownItem } from 'pui-react-dropdowns';

const propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.node,
  project: PropTypes.shape({
    data: PropTypes.object,
    fieldguides: PropTypes.array,
    pages: PropTypes.array,
    tutorials: PropTypes.array,
    workflows: PropTypes.array
  }),
  params: PropTypes.shape({
    project_id: PropTypes.string
  })
};

class ProjectDashboardContainer extends Component {
  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      translationLanguage: '',
    };
  }
  componentDidMount() {
    const { actions } = this.props;
    actions.fetchProject(this.props.params.project_id);
  }

  handleSelect(event) {
    this.setState({
      translationLanguage: event.target.textContent,
    });
  }

  render() {
    const project = this.props.project.data;
    const { fieldguides, pages, workflows, tutorials } = this.props.project;
    const renderDropdownItems = languages.map((item) => {
      return (
        <DropdownItem key={item.code} onSelect={this.handleSelect}>
          {item.name}
        </DropdownItem>
      );
    });
    return (
      <div>
        <h2>Project Dashboard</h2>
          <Dropdown className="no-setwidth-dropdown" floatMenu scroll size="normal" split title={this.state.translationLanguage || 'Language'}>
            {renderDropdownItems}
          </Dropdown>
        {React.cloneElement(this.props.children, { fieldguides, pages, project, workflows, tutorials })}
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
ProjectDashboardContainer.defaultProps = {
  children: null,
  project: {
    data: null,
    tutorials: [],
    workflows: []
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectDashboardContainer);
