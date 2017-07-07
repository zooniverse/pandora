function isElementTranslatable(event) {
  if (event.target.getAttribute('data-translation-key')) {
    return true;
  }
  return false;
}

export default isElementTranslatable;
