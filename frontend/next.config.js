const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  publicRuntimeConfig: {
    APP_NAME: 'FOODIE',
    API_DEVELOPMENT: 'http://localhost:8000/api',
    PRODUCTION: false,
    DISQUS_SHORTNAME: 'foodie-4',
  },
});
