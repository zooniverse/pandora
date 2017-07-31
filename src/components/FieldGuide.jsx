import React from 'react';
import PropTypes from 'prop-types';
import fixIt, { options } from 'react-fix-it';
import TranslationField from './TranslationField';

const propTypes = {
  contents: PropTypes.object.isRequired,
};

options.log = (test) => {
  console.warn(test);
};

function FieldGuideItem(props) {
  const { index, item, translation } = props;
  return (
    <li>
      <TranslationField
        translationKey={`items.${index}.title`}
        original={item.title}
        translation={translation.title}
      >
        Title
      </TranslationField>
      <TranslationField
        isMarkdown={true}
        translationKey={`items.${index}.content`}
        original={item.content}
        translation={translation.content}
      >
        Content
      </TranslationField>
    </li>
  );
}

FieldGuideItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string
  }).isRequired,
  translation: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string
  })
};

function FieldGuide(props) {
  const { contents } = props;
  const original = contents.original || { items: [] };
  const translation = contents.translation || { items: [] };
  return (
    <div>
      <h2>Field Guide</h2>
      <ul>
        {original.items && original.items.map((item, i) => {
          return (
            <FieldGuideItem
              key={item.id}
              index={i}
              item={item}
              translation={translation.items[i]}
            />
          )
        })}
      </ul>
    </div>
  );
}

FieldGuide.propTypes = propTypes;
export default fixIt(FieldGuide);
