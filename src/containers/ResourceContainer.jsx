import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contentsActions from '../ducks/resource';

class ResourceContainer extends Component {

  componentWillMount() {
    const { actions } = this.props;
    actions.resetTranslations();
  }

  componentDidMount() {
    const { actions, params, primary_language, language } = this.props;
    const { resource_id, resource_type } = params;
    actions.fetchTranslations(resource_id, resource_type, primary_language, language);
  }

  componentWillReceiveProps(newProps) {
    const { actions, params, resource, language } = newProps;
    if (newProps.language !== this.props.language && newProps.language.value !== newProps.primary_language) {
      const { resource_type } = params;
      const { original, translations } = resource;
      actions.selectTranslation(original, translations, resource_type, language);
    }
    if (newProps.resource.error) {
      const { message, status, statusText } = newProps.resource.error;
      alert(`${status}: ${statusText}\n ${message}`);
      actions.resetErrors();
    }
  }

  render() {
    const { language, resource } = this.props;
    return React.cloneElement(this.props.children, { contents: resource, language });
  }
}

const mapStateToProps = state => ({
  resource: state.resource
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(contentsActions, dispatch)
});

ResourceContainer.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  children: PropTypes.node,
  language: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  params: PropTypes.shape({
    resource_id: PropTypes.string,
    resource_type: PropTypes.string
  }).isRequired,
  primary_language: PropTypes.string,
  resource: PropTypes.object.isRequired
};

ResourceContainer.defaultProps = {
  children: null,
  language: {
    label: '',
    value: ''
  },
  primary_language: 'en'
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResourceContainer);
