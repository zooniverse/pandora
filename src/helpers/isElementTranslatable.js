function isElementTranslatable(event) {
  if (event.target.dataset.translationProjectContents) {
    return true;
  }
  return false;
}

export default isElementTranslatable;
