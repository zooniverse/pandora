import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import languages from '../constants/languages';
import * as projectActions from '../ducks/project';
import Select from 'grommet/components/Select';

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
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      searchText: '',
      translationLanguage: '',
    };
  }
  componentDidMount() {
    const { actions } = this.props;
    actions.fetchProject(this.props.params.project_id);
  }

  handleSearch(event) {
    this.setState({
      searchText: event.target.value,
    });
  }

  handleSelect({ option }) {
    this.setState({
      translationLanguage: option.value,
    });
  }

  getSelectOptions() {
    const searchStr = this.state.searchText;
    let langs = languages.slice();
    if (searchStr) {
      const matchesSearch = (langObj) => langObj.label.toLowerCase().substr(0, searchStr.length) === searchStr;
      langs = languages.filter(matchesSearch);
    }
    return langs;
  }

  render() {
    const project = this.props.project.data;
    const { fieldguides, pages, workflows, tutorials } = this.props.project;
    const options = this.getSelectOptions();
    return (
      <div>
        <h2>Project Dashboard</h2>
        <Select
          onChange={this.handleSelect}
          onSearch={this.handleSearch}
          options={options}
          placeHolder="Select a language"
          value={this.state.translationLanguage}
        />

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
