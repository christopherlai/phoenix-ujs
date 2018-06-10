import { matches, getData, setData } from '../utils/dom';
import { stopEverything } from '../utils/event';
import { formElements } from '../utils/form';
import selectors from '../selectors';

const handleDisabledElement = function(e) {
  const element = this;
  if (element.disabled) { return stopEverything(e); }
};

// Unified function to enable an element (link, button and form)
const enableElement = function(e) {
  const element = e instanceof Event ? e.target : e;
  if (matches(element, selectors.linkDisableSelector)) {
    return enableLinkElement(element);
  } else if (matches(element, selectors.buttonDisableSelector) || matches(element, selectors.formEnableSelector)) {
    return enableFormElement(element);
  } else if (matches(element, selectors.formSubmitSelector)) {
    return enableFormElements(element);
  }
};

// Unified function to disable an element (link, button and form)
const disableElement = function(e) {
  const element = e instanceof Event ? e.target : e;
  if (matches(element, selectors.linkDisableSelector)) {
    return disableLinkElement(element);
  } else if (matches(element, selectors.buttonDisableSelector) || matches(element, selectors.formDisableSelector)) {
    return disableFormElement(element);
  } else if (matches(element, selectors.formSubmitSelector)) {
    return disableFormElements(element);
  }
};

//  Replace element's html with the 'data-disable-with' after storing original html
//  and prevent clicking on it
var disableLinkElement = function(element) {
  const replacement = element.getAttribute('data-disable-with');
  if (replacement != null) {
    setData(element, 'ujs:enable-with', element.innerHTML); // store enabled state
    element.innerHTML = replacement;
  }
  element.addEventListener('click', stopEverything); // prevent further clicking
  return setData(element, 'ujs:disabled', true);
};

// Restore element to its original state which was disabled by 'disableLinkElement' above
var enableLinkElement = function(element) {
  const originalText = getData(element, 'ujs:enable-with');
  if (originalText != null) {
    element.innerHTML = originalText; // set to old enabled state
    setData(element, 'ujs:enable-with', null); // clean up cache
  }
  element.removeEventListener('click', stopEverything); // enable element
  return setData(element, 'ujs:disabled', null);
};

// Disables form elements:
//  - Caches element value in 'ujs:enable-with' data store
//  - Replaces element text with value of 'data-disable-with' attribute
//  - Sets disabled property to true
var disableFormElements = form => formElements(form, selectors.formDisableSelector).forEach(disableFormElement);

var disableFormElement = function(element) {
  const replacement = element.getAttribute('data-disable-with');
  if (replacement != null) {
    if (matches(element, 'button')) {
      setData(element, 'ujs:enable-with', element.innerHTML);
      element.innerHTML = replacement;
    } else {
      setData(element, 'ujs:enable-with', element.value);
      element.value = replacement;
    }
  }
  element.disabled = true;
  return setData(element, 'ujs:disabled', true);
};

// Re-enables disabled form elements:
//  - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
//  - Sets disabled property to false
var enableFormElements = form => formElements(form, selectors.formEnableSelector).forEach(enableFormElement);

var enableFormElement = function(element) {
  const originalText = getData(element, 'ujs:enable-with');
  if (originalText != null) {
    if (matches(element, 'button')) {
      element.innerHTML = originalText;
    } else {
      element.value = originalText;
    }
    setData(element, 'ujs:enable-with', null); // clean up cache
  }
  element.disabled = false;
  return setData(element, 'ujs:disabled', null);
};

export { handleDisabledElement, enableElement, disableElement };
