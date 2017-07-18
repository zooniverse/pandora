import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import languages from '../constants/languages';
import { fetchProject } from '../ducks/project';
import { createTranslation } from '../ducks/resource';
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
  }),
  resource: PropTypes.shape({
    original: PropTypes.object,
    translation: PropTypes.object,
    translations: PropTypes.array,
  }),
};

class ProjectDashboardContainer extends Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.state = {
      searchText: '',
      option: {},
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
    const { actions } = this.props;
    this.setState({
      option,
    });
  }

  onLanguageChange(e) {
    const { value } = e.target;
    const [option] = languages.filter(option => option.value === value);
    this.handleSelect({ option });
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
    const { translations } = this.props.resource;
    let newLanguages = this.getSelectOptions();
    const language = this.state.option.value;
    const existingLanguages = [];
    translations.map((translation) => {
      const [languageOption] = languages.filter(option => option.value === translation.language);
      existingLanguages.push(languageOption);
      newLanguages = newLanguages.filter(option => option !== languageOption);
    });
    const selectedOption = newLanguages.indexOf(this.state.option) > -1 ? this.state.option : null;
    
    return (
      <div>
        <h2>Project Dashboard</h2>
        <h3>Pick a language</h3>
        <ul>
          {existingLanguages.map((option) => {
            return (
              <li key={option.value}>
                <label>
                  <input
                    name="lang"
                    type="radio"
                    checked={option.value === this.state.option.value}
                    value={option.value}
                    onChange={this.onLanguageChange}
                  />
                  {option.label}
                </label>
              </li>
            );
          })}
        </ul>
        <label>
          or add a new language
          <Select
            onChange={this.handleSelect}
            onSearch={this.handleSearch}
            options={newLanguages}
            placeHolder="Select a language"
            value={selectedOption}
          />
        </label>

        {project.primary_language && React.cloneElement(this.props.children, { fieldguides, language, pages, project, tutorials, workflows })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  project: state.project,
  resource: state.resource,
});
const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchProject: bindActionCreators(fetchProject, dispatch),
    createTranslation: bindActionCreators(createTranslation, dispatch)
  },
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
