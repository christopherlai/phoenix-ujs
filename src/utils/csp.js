// Content-Security-Policy nonce for inline scripts
const cspNonce = function() {
  const meta = document.querySelector('meta[name=csp-nonce]');
  return meta && meta.content;
};

export default cspNonce;
