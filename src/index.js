import { fire, delegate } from './utils/event';
import { getData, $ } from './utils/dom';
import { refreshCSRFTokens, CSRFProtection } from './utils/csrf';
import { handleConfirm } from './features/confirm';
import { enableElement, disableElement, handleDisabledElement } from './features/disable';
import { handleRemote, formSubmitButtonClick, handleMetaClick } from './features/remote';
import { handleMethod } from './features/method';
import selectors from './selectors';

// For backward compatibility
if ((typeof jQuery !== 'undefined' && jQuery !== null) && (jQuery.ajax != null) && !jQuery.rails) {
  jQuery.ajaxPrefilter(function(options, originalOptions, xhr) {
    if (!options.crossDomain) { return CSRFProtection(xhr); }
  });
}

const phoenixUJS = {
  selectors: selectors,

  start: function() {

  if (!fire(document, 'rails:attachBindings')) { return; };
  // Cut down on the number of issues from people inadvertently including
  // rails-ujs twice by detecting and raising an error when it happens.
  if (window._rails_loaded) { throw new Error('rails-ujs has already been loaded!'); }

  // This event works the same as the load event, except that it fires every
  // time the page is loaded.
  // See https://github.com/rails/jquery-ujs/issues/357
  // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
  window.addEventListener('pageshow', () => {
    $(this.selectors.formEnableSelector).forEach(function(el) {
      if (getData(el, 'ujs:disabled')) { return enableElement(el); }
    });
    return $(this.selectors.linkDisableSelector).forEach(function(el) {
      if (getData(el, 'ujs:disabled')) { return enableElement(el); }
    });
  });

  delegate(document, this.selectors.linkDisableSelector, 'ajax:complete', enableElement);
  delegate(document, this.selectors.linkDisableSelector, 'ajax:stopped', enableElement);
  delegate(document, this.selectors.buttonDisableSelector, 'ajax:complete', enableElement);
  delegate(document, this.selectors.buttonDisableSelector, 'ajax:stopped', enableElement);

  delegate(document, this.selectors.linkClickSelector, 'click', handleDisabledElement);
  delegate(document, this.selectors.linkClickSelector, 'click', handleConfirm);
  delegate(document, this.selectors.linkClickSelector, 'click', handleMetaClick);
  delegate(document, this.selectors.linkClickSelector, 'click', disableElement);
  delegate(document, this.selectors.linkClickSelector, 'click', handleRemote);
  delegate(document, this.selectors.linkClickSelector, 'click', handleMethod);

  delegate(document, this.selectors.buttonClickSelector, 'click', handleDisabledElement);
  delegate(document, this.selectors.buttonClickSelector, 'click', handleConfirm);
  delegate(document, this.selectors.buttonClickSelector, 'click', disableElement);
  delegate(document, this.selectors.buttonClickSelector, 'click', handleRemote);

  delegate(document, this.selectors.inputChangeSelector, 'change', handleDisabledElement);
  delegate(document, this.selectors.inputChangeSelector, 'change', handleConfirm);
  delegate(document, this.selectors.inputChangeSelector, 'change', handleRemote);

  delegate(document, this.selectors.formSubmitSelector, 'submit', handleDisabledElement);
  delegate(document, this.selectors.formSubmitSelector, 'submit', handleConfirm);
  delegate(document, this.selectors.formSubmitSelector, 'submit', handleRemote);
  // Normal mode submit
  // Slight timeout so that the submit button gets properly serialized
  delegate(document, this.selectors.formSubmitSelector, 'submit', e => setTimeout((() => disableElement(e)), 13));
  delegate(document, this.selectors.formSubmitSelector, 'ajax:send', disableElement);
  delegate(document, this.selectors.formSubmitSelector, 'ajax:complete', enableElement);

  delegate(document, this.selectors.formInputClickSelector, 'click', handleDisabledElement);
  delegate(document, this.selectors.formInputClickSelector, 'click', handleConfirm);
  delegate(document, this.selectors.formInputClickSelector, 'click', formSubmitButtonClick);

  document.addEventListener('DOMContentLoaded', refreshCSRFTokens);
  return window._rails_loaded = true;
  }
};


export default phoenixUJS;
