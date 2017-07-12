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

function FieldGuideItem(props) {
  const { item } = props;
  return (
    <li>
      <dl>
        <dt>title</dt>
        <dd>{item.title}</dd>
        <dt>content</dt>
        <dd>{item.content}</dd>
      </dl>
    </li>
  );
}

FieldGuideItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string
  }).isRequired
};

function FieldGuide(props) {
  const { contents } = props;
  const fieldguide = contents.original || { items: [] };
  return (
    <div>
      <h2>Field Guide</h2>
      <ul>
        {fieldguide.items && fieldguide.items.map(item => <FieldGuideItem key={item.id} item={item} />)}
      </ul>
    </div>
  );
}

FieldGuide.propTypes = propTypes;
export default fixIt(FieldGuide);
