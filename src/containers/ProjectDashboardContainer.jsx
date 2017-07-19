import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LanguageSelector from '../components/LanguageSelector';
import { fetchProject } from '../ducks/project';
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
      searchText: '',
      option: {
        label: '',
        value: ''
      },
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchProject(this.props.params.project_id);
  }

  onChangeLanguage(option) {
    this.setState({ option });
  }

  render() {
    const project = this.props.project.data;
    const { fieldguides, pages, workflows, tutorials } = this.props.project;
    const { translations } = this.props.resource;
    const language = this.state.option.value;
    
    return (
      <div>
        <h2>Project Dashboard</h2>
        <LanguageSelector translations={translations} value={this.state.option} onChange={this.onChangeLanguage} />
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
