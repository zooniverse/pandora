import React from 'react';
import PropTypes from 'prop-types';
import AppLink from './AppLink'

function OrganisationListItem(props) {
  return (
    <li key={props.organisation.id}>
      <AppLink
        label={props.organisation.display_name}
        to={`/organization/${props.organisation.id}`}
      />
    </li>
  );
}

OrganisationListItem.propTypes = {
  organisation: PropTypes.shape({
    id: PropTypes.string,
    display_name: PropTypes.string
  }).isRequired
};

function OrganisationList(props) {
  const { organisations } = props;
  return (
    <div>
      <h2>Your Organisations</h2>
      <ul>
        {organisations.data.map(organisation => (
          <OrganisationListItem key={organisation.id} organisation={organisation} />
        ))}
      </ul>
    </div>
  );
}

OrganisationList.propTypes = {
  organisations: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
};

OrganisationList.defaultProps = {
  organisations: {
    data: []
  }
};

export default OrganisationList;
