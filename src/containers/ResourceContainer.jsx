import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTranslations, resetErrors, resetTranslations, selectTranslation } from '../ducks/resource';

class ResourceContainer extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resetTranslations());
  }

  componentDidMount() {
    const { dispatch, params, primary_language, language } = this.props;
    const { resource_id, resource_type } = params;
    dispatch(fetchTranslations(resource_id, resource_type, primary_language, language));
  }

  componentDidUpdate(prevProps) {
    const { dispatch, params, resource, language, primary_language } = this.props;
    if (prevProps.language !== language && language.value !== primary_language) {
      const { resource_type } = params;
      const { original, translations } = resource;
      dispatch(selectTranslation(original, translations, resource_type, language));
    }
    if (resource.error) {
      const { message, status, statusText } = resource.error;
      alert(`${status}: ${statusText}\n ${message}`);
      dispatch(resetErrors());
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

export default connect(mapStateToProps)(ResourceContainer);
