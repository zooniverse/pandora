import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LanguageSelector from '../components/LanguageSelector';
import { fetchProject, setLanguage } from '../ducks/project';
import { createTranslation } from '../ducks/resource';

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
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.state = {
      searchText: ''
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchProject(this.props.params.project_id);
  }

  onChangeLanguage(option) {
    const { actions } = this.props;
    actions.setLanguage(option);
  }

  render() {
    const project = this.props.project.data;
    const { fieldguides, language, pages, workflows, tutorials } = this.props.project;
    const { translations } = this.props.resource;
    
    return (
      <div>
        <h2>Project Dashboard</h2>
        <LanguageSelector translations={translations} value={language} onChange={this.onChangeLanguage} />
        {project.primary_language && React.cloneElement(this.props.children, { fieldguides, language, pages, project, tutorials, workflows })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language,
  project: state.project,
  resource: state.resource,
});
const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchProject: bindActionCreators(fetchProject, dispatch),
    setLanguage: bindActionCreators(setLanguage, dispatch),
    createTranslation: bindActionCreators(createTranslation, dispatch)
  },
});

ProjectDashboardContainer.propTypes = propTypes;
ProjectDashboardContainer.defaultProps = {
  children: null,
  project: {
    data: null,
    language: null,
    tutorials: [],
    workflows: []
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectDashboardContainer);
