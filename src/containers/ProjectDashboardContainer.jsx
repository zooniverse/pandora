import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import LanguageSelector from '../components/LanguageSelector';
import { fetchProject, addLanguage, setLanguage, fetchLanguages } from '../ducks/project';
import { createTranslation } from '../ducks/resource';
import languages from '../constants/languages';
import config from '../constants/config';

class ProjectDashboardContainer extends Component {
  constructor() {
    super();
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.state = {
      searchText: ''
    };
  }

  componentDidMount() {
    const { dispatch, adminMode, params } = this.props;
    const { query } = this.props.location;
    dispatch(fetchProject(params.project_id, adminMode));
    dispatch(fetchLanguages(params.project_id));
    if (query.language) {
      const language = languages.filter(option => option.value === query.language)[0];
      dispatch(setLanguage(language));
    }
  }

  componentDidUpdate(prevProps) {
    const { dispatch, adminMode, params } = this.props;
    if (adminMode !== prevProps.adminMode) {
      const { query } = this.props.location;
      dispatch(fetchProject(params.project_id, adminMode));
      dispatch(fetchLanguages(params.project_id));
      if (query.language) {
        const language = languages.filter(option => option.value === query.language)[0];
        dispatch(setLanguage(language));
      }
    }
  }

  onChangeLanguage(option) {
    const { dispatch } = this.props;
    const { languageCodes } = this.props.project;
    if (languageCodes.indexOf(option.value) === -1) {
      languageCodes.push(option.value);
      dispatch(addLanguage(languageCodes));
    }
    dispatch(setLanguage(option));
  }

  render() {
    const project = this.props.project.data;
    const { fieldguides, language, languageCodes, pages, primary_language, workflows, tutorials } = this.props.project;
    const projectLanguages = languages
      .filter(option => (languageCodes.indexOf(option.value) > -1))
      .filter(option => (option.value !== primary_language));
    return (
      <div>
        <h2>
          <Link
            to={`/project/${project.id}`}
          >
            {project.display_name}
          </Link>
        </h2>
        <LanguageSelector languages={projectLanguages} value={language} onChange={this.onChangeLanguage} />
        {language &&
          <p className="preview">
            <a
              className="grommetux-button"
              target="preview"
              href={`${config.projectHost}/projects/${project.slug}?language=${language.value}`}
            >
              Preview your translation
            </a>
          </p>
        }
        {primary_language &&
          React.cloneElement(
            this.props.children,
            { fieldguides, language, pages, primary_language, project, tutorials, workflows }
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  adminMode: state.login.adminMode,
  project: state.project,
  resource: state.resource
});

ProjectDashboardContainer.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  children: PropTypes.node,
  isAdmin: PropTypes.bool,
  location: PropTypes.shape({
    query: PropTypes.object
  }),
  project: PropTypes.shape({
    data: PropTypes.object,
    fieldguides: PropTypes.array,
    language: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    languageCodes: PropTypes.arrayOf(PropTypes.string),
    pages: PropTypes.array,
    tutorials: PropTypes.array,
    workflows: PropTypes.array
  }),
  params: PropTypes.shape({
    project_id: PropTypes.string
  }).isRequired
};

ProjectDashboardContainer.defaultProps = {
  children: null,
  isAdmin: false,
  location: {},
  project: {
    data: null,
    language: null,
    languageCodes: [],
    tutorials: [],
    workflows: []
  }
};
export default connect(mapStateToProps)(ProjectDashboardContainer);
