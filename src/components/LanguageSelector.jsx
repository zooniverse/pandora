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
    const menuLanguages = this.state.newLanguages.filter(option => this.props.languages.indexOf(option) === -1);

    return (
      <div>
        <h3>Pick a language</h3>
        <ul className="language-selector">
          {this.props.languages.filter(Boolean).map((option) => {
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
                  <span
                    className={
                      checked ?
                      "grommetux-button grommetux-button--primary" :
                      "grommetux-button"
                    }
                  >
                    {option.label}
                  </span>
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
  languages: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  })
};

LanguageSelector.defaultProps = {
  onChange: () => null,
  languages: [],
  value: {
    label: '',
    value: ''
  }
};

export default LanguageSelector;

