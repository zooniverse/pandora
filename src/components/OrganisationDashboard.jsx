import React from 'react';
import PropTypes from 'prop-types';
import ResourceContainer from '../containers/ResourceContainer';
import Organisation from './Organisation';

function OrganisationDashboard(props) {
  const { language, organisation } = props;
  const params = {
    resource_type: 'organization',
    resource_id: props.params.organization_id
  }
  return (
    <div>
      {language ?
        <ResourceContainer {...props} params={params}>
          <Organisation />
        </ResourceContainer> :
        <p>Select a language to start.</p>
      }
    </div>
  );
}

OrganisationDashboard.propTypes = {
  language: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  }),
  project: PropTypes.object.isRequired
};


OrganisationDashboard.defaultProps = {
  language: {
    label: '',
    value: ''
  },
  project: {}
};

export default OrganisationDashboard;
