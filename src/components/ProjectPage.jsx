import React from 'react';
import PropTypes from 'prop-types';
import fixIt, { options } from 'react-fix-it';

const propTypes = {
  contents: PropTypes.object.isRequired,
};

options.log = (test) => {
  console.warn(test);
};

function ProjectPage(props) {
  const { contents } = props;
  const page = contents.original || {};
  return (
    <div>
      <h2>Project Page</h2>
      <dl>
        <dt>title</dt>
        <dd data-translation-key="title">{page.title}</dd>
        <dt>content</dt>
        <dd data-translation-key="content">{page.content}</dd>
      </dl>
    </div>
  );
}

ProjectPage.propTypes = propTypes;
export default fixIt(ProjectPage);
