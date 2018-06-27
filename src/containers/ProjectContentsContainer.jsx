import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contentsActions from '../ducks/resource';

class ProjectContentsContainer extends Component {

  componentWillMount() {
    const { actions } = this.props;
    actions.resetTranslations();
  }

  componentDidMount() {
    const { actions, params, project, language } = this.props;
    const type = params.resource_type;
    const id = type ? params.resource_id : params.project_id;
    actions.fetchTranslations(id, type, project, language);
  }

  componentWillReceiveProps(newProps) {
    const { actions, params, resource, language } = newProps;
    if (newProps.language !== this.props.language && newProps.language.value !== newProps.project.primary_language) {
      const type = params.resource_type;
      const { original, translations } = resource;
      actions.selectTranslation(original, translations, type, language);
    }
  }

  render() {
    const { language, project, resource } = this.props;
    return React.cloneElement(this.props.children, { contents: resource, language, project });
  }
}

const mapStateToProps = state => ({
  resource: state.resource
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(contentsActions, dispatch)
});

ProjectContentsContainer.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  children: PropTypes.node,
  language: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  params: PropTypes.shape({
    project_id: PropTypes.string,
    resource_id: PropTypes.string,
    resource_type: PropTypes.string
  }).isRequired,
  project: PropTypes.shape({
    data: PropTypes.object,
    fieldguides: PropTypes.array,
    language: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    pages: PropTypes.array,
    tutorials: PropTypes.array,
    workflows: PropTypes.array
  }).isRequired,
  resource: PropTypes.object.isRequired
};

ProjectContentsContainer.defaultProps = {
  children: null,
  language: {
    label: '',
    value: ''
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectContentsContainer);
