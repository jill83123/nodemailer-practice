// CSRF 阻擋跨站攻擊

const { doubleCsrf } = require('csrf-csrf');

const doubleCsrfOptions = {
  getSecret: () => 'Secret',
  cookieName: '_csrf',
  cookieOptions: {
    sameSite: 'lax',
    path: '/',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
  size: 64,
  ignoredMethods: ['HEAD', 'OPTIONS'],
  getTokenFromRequest: (req) => req.body._csrf,
};

const { generateToken, doubleCsrfProtection } = doubleCsrf(doubleCsrfOptions);

module.exports = {
  generateToken,
  doubleCsrfProtection,
};
