function isElementTranslatable(element) {
  if (element.getAttribute('data-translation-key')) {
    return true;
  }
  return false;
}

export default isElementTranslatable;
