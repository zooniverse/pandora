import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from 'markdownz';
import fixIt, { options } from 'react-fix-it';

const propTypes = {
  contents: PropTypes.object.isRequired,
};

options.log = (test) => {
  console.warn(test);
};

function Tutorial(props) {
  const { contents } = props;
  const tutorial = contents.original || { steps: [] };
  const steps = [];
  tutorial.steps && tutorial.steps.map((step, key) => steps.push(<p key={key}><b>{key}</b> {step.content}</p>));
  return (
    <div>
      <h2>Tutorial</h2>
      {steps}
    </div>
  );
}

Tutorial.propTypes = propTypes;
export default fixIt(Tutorial);
