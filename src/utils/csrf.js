import { $ } from './dom';


// Up-to-date Cross-Site Request Forgery token
const csrfToken =  function() {
  const meta = document.querySelector('meta[name=csrf-token]');
  return meta && meta.content;
};

// URL param that must contain the CSRF token
const csrfParam = function() {
  const meta = document.querySelector('meta[name=csrf-token]');
  return meta && meta.getAttribute('csrf-param');
};

// Make sure that every Ajax request sends the CSRF token
const CSRFProtection = function(xhr) {
  const token = csrfToken();
  if (token != null) { return xhr.setRequestHeader('X-CSRF-Token', token); }
};

// Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
const refreshCSRFTokens = function() {
  const token = csrfToken();
  const param = csrfParam();
  if ((token != null) && (param != null)) {
    return $(`form input[name="${param}"]`).forEach(input => input.value = token);
  }
};

export { csrfToken, CSRFProtection, refreshCSRFTokens };
