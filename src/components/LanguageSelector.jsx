import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'grommet/components/Select';
import languages from '../constants/languages';

class LanguageSelector extends Component {
  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.state = {
      newLanguages: []
    };
  }

  onLanguageChange(e) {
    const { value } = e.target;
    const [option] = languages.filter(language => language.value === value);
    this.props.onChange(option);
  }

  handleSearch(event) {
    const searchStr = event.target.value;
    if (searchStr) {
      const matchesSearch = langObj =>
        langObj.label.toLowerCase().substr(0, searchStr.length) === searchStr.toLowerCase();
      const newLanguages = languages.filter(matchesSearch);
      this.setState({ newLanguages });
    }
  }

  handleSelect({ option }) {
    this.props.onChange(option);
  }

  render() {
    let menuLanguages = this.state.newLanguages.slice();
    const existingLanguages = this.props.translations.map((translation) => {
      const [languageOption] = languages.filter(option => option.value === translation.language);
      menuLanguages = menuLanguages.filter(option => option !== languageOption);
      return languageOption;
    });

    return (
      <div>
        <h3>Pick a language</h3>
        <ul className="language-selector">
          {existingLanguages.filter(Boolean).map((option) => {
            const checked = this.props.value ? option.value === this.props.value.value : false;
            return (
              <li key={option.value}>
                <label>
                  <input
                    name="lang"
                    type="radio"
                    checked={checked}
                    value={option.value}
                    onChange={this.onLanguageChange}
                  />
                  <span className="grommetux-button">{option.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
        <label>
          or add a new language
          <Select
            onChange={this.handleSelect}
            onSearch={this.handleSearch}
            options={menuLanguages}
            placeHolder="Select a language"
          />
        </label>
      </div>
    );
  }
}

LanguageSelector.propTypes = {
  onChange: PropTypes.func,
  translations: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  })
};

LanguageSelector.defaultProps = {
  onChange: () => null,
  translations: [],
  value: {
    label: '',
    value: ''
  }
};

export default LanguageSelector;

