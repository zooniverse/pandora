import React from 'react';
import PropTypes from 'prop-types';

function ProjectPage(props) {
  const { contents } = props;
  const page = contents.original || {};
  return (
    <div>
      <h2>Project Page</h2>
      <dl>
        <dt>title</dt>
        <dd>{page.title}</dd>
        <dt>content</dt>
        <dd>{page.content}</dd>
      </dl>
    </div>
  );
}

ProjectPage.propTypes = {
  contents: PropTypes.shape({
    original: PropTypes.object
  }).isRequired
};

export default ProjectPage;
