const selectors = {
  // Link elements bound by rails-ujs
  linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

  // Button elements bound by rails-ujs
  buttonClickSelector: {
    selector: 'button[data-remote]:not([form]), button[data-confirm]:not([form])',
    exclude: 'form button'
  },

  // Select elements bound by rails-ujs
  inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

  // Form elements bound by rails-ujs
  formSubmitSelector: 'form',

  // Form input elements bound by rails-ujs
  formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

  // Form input elements disabled during form submission
  formDisableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

  // Form input elements re-enabled after form submission
  formEnableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

  // Form file input elements
  fileInputSelector: 'input[name][type=file]:not([disabled])',

  // Link onClick disable selector with possible reenable after remote submission
  linkDisableSelector: 'a[data-disable-with], a[data-disable]',

  // Button onClick disable selector with possible reenable after remote submission
  buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]'
};

export default selectors;
