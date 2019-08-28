import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as organisationsActions from '../ducks/organisations';

import OrganisationList from '../components/OrganisationList';

class OrganisationListContainer extends Component {

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchOrganisations();
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(organisationsActions, dispatch)
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganisationListContainer);
