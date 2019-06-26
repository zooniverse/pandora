import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import LanguageSelector from '../components/LanguageSelector';
import { fetchOrganisation, addLanguage, setLanguage, fetchLanguages } from '../ducks/organisation';
import { createTranslation } from '../ducks/resource';
import languages from '../constants/languages';
import config from '../constants/config';

class OrganisationDashboardContainer extends Component {
  constructor() {
    super();
    this.onChangeLanguage = this.onChangeLanguage.bind(this);
    this.state = {
      searchText: ''
    };
  }

  componentDidMount() {
    const { actions, adminMode, params } = this.props;
    const { query } = this.props.location;
    actions.fetchOrganisation(params.organization_id, adminMode);
    actions.fetchLanguages(params.organization_id);
    if (query.language) {
      const language = languages.filter(option => option.value === query.language)[0];
      actions.setLanguage(language);
    }
  }

  onChangeLanguage(option) {
    const { actions } = this.props;
    const { languageCodes } = this.props.organisation;
    if (languageCodes.indexOf(option.value) === -1) {
      languageCodes.push(option.value);
      actions.addLanguage(languageCodes);
    }
    actions.setLanguage(option);
  }

  render() {
    const organisation = this.props.organisation.data;
    const { language, languageCodes, primary_language } = this.props.organisation;
    const organisationLanguages = languages
      .filter(option => (languageCodes.indexOf(option.value) > -1))
      .filter(option => (option.value !== primary_language));
    return (
      <div>
        <h2>
          <Link
            to={`/organisation/${organisation.id}`}
          >
            {organisation.display_name}
          </Link>
        </h2>
        <LanguageSelector languages={organisationLanguages} value={language} onChange={this.onChangeLanguage} />
        {language &&
          <p className="preview">
            <a
              className="grommetux-button"
              target="preview"
              href={`${config.projectHost}/organizations/${organisation.slug}?language=${language.value}`}
            >
              Preview your translation
            </a>
          </p>
        }
        {primary_language &&
          React.cloneElement(
            this.props.children,
            { language, organisation, primary_language }
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  adminMode: state.login.adminMode,
  language: state.language,
  languages: state.languages,
  organisation: state.organisation,
  resource: state.resource
});
const mapDispatchToProps = dispatch => ({
  actions: {
    fetchOrganisation: bindActionCreators(fetchOrganisation, dispatch),
    addLanguage: bindActionCreators(addLanguage, dispatch),
    setLanguage: bindActionCreators(setLanguage, dispatch),
    createTranslation: bindActionCreators(createTranslation, dispatch),
    fetchLanguages: bindActionCreators(fetchLanguages, dispatch)
  }
});

OrganisationDashboardContainer.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  adminMode: PropTypes.bool,
  children: PropTypes.node,
  location: PropTypes.shape({
    query: PropTypes.object
  }),
  organisation: PropTypes.shape({
    data: PropTypes.object,
    language: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }),
    languageCodes: PropTypes.arrayOf(PropTypes.string),
    primary_language: PropTypes.string
  }),
  params: PropTypes.shape({
    organisation_id: PropTypes.string
  }).isRequired
};

OrganisationDashboardContainer.defaultProps = {
  adminMode: false,
  children: null,
  location: {},
  organisation: {
    data: null,
    language: null,
    languageCodes: [],
    primary_language: 'en'
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganisationDashboardContainer);
