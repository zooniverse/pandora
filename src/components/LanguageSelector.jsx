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
    }
  }
  
  handleSearch(event) {
    const searchStr = event.target.value;
    if (searchStr) {
      const matchesSearch = (langObj) => langObj.label.toLowerCase().substr(0, searchStr.length) === searchStr.toLowerCase();
      const newLanguages = languages.filter(matchesSearch);
      this.setState({ newLanguages });
    }
  }

  handleSelect({ option }) {
    this.props.onChange(option);
  }

  onLanguageChange(e) {
    const { value } = e.target;
    const [option] = languages.filter(option => option.value === value);
    this.props.onChange(option);
  }

  render() {
    const existingLanguages = [];
    let menuLanguages = this.state.newLanguages.slice();
    this.props.translations.map((translation) => {
      const [languageOption] = languages.filter(option => option.value === translation.language);
      existingLanguages.push(languageOption);
      menuLanguages = menuLanguages.filter(option => option !== languageOption);
    });
    return (
      <div>
        <h3>Pick a language</h3>
        <ul className="language-selector">
          {existingLanguages.map((option) => {
            return (
              <li key={option.value}>
                <label>
                  <input
                    name="lang"
                    type="radio"
                    checked={option.value === this.props.value.value}
                    value={option.value}
                    onChange={this.onLanguageChange}
                  />
                  <span>{option.label}</span>
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
            value={this.props.value}
          />
        </label>
      </div>
    );
  }
}

LanguageSelector.propTypes = {
  onChange: PropTypes.func,
  translations: PropTypes.array
};

LanguageSelector.defaultProps = {
  onChange: () => null,
  translations: []
};

export default LanguageSelector;

