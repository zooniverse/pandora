import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

function OrganisationListItem(props) {
  return (
    <li key={props.organisation.id}>
      <Link to={`/organization/${props.organisation.id}`} >{props.organisation.display_name}</Link>
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
