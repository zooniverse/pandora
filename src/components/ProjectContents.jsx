import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fixIt, { options } from 'react-fix-it';

const propTypes = {
  contents: PropTypes.object.isRequired,
  modal: PropTypes.bool.isRequired,
};

options.log = (test) => {
  console.warn(test);
};

class ProjectContents extends Component {

  render() {
    const { contents } = this.props;
    const data = contents.data;
    return (
      <div>
        <h2>Project Contents</h2>
        <p>Title: { data.title }</p>
        <p>Description: { data.description }</p>
        <p>Introduction: { data.introduction }</p>
        <p>Language: { data.language}</p>
      </div>
    );
  }
}

ProjectContents.propTypes = propTypes;
export default fixIt(ProjectContents);
