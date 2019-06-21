import React from 'react';
import PropTypes from 'prop-types';
import ResourceContainer from '../containers/ResourceContainer';
import Resource from './Resource';

function OrganisationDashboard(props) {
  const { language, organisation } = props;
  return (
    <div>
      {language ?
        <ResourceContainer {...props} resource_type='organization'>
          <Resource resource_type='organization' />
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
