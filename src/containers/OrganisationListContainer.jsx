import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchOrganisations } from '../ducks/organisations';

import OrganisationList from '../components/OrganisationList';

class OrganisationListContainer extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchOrganisations());
  }

  render() {
    const { organisations } = this.props;
    return (
      <OrganisationList organisations={organisations} />
    );
  }
}

const mapStateToProps = state => ({
  organisations: state.organisations
});

OrganisationListContainer.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  organisations: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
};

OrganisationListContainer.defaultProps = {
  organisations: {
    data: []
  }
};

export default connect(mapStateToProps)(OrganisationListContainer);
