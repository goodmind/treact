const postcssAssets = require('postcss-assets');
const postcssNext = require('postcss-cssnext');

module.exports = ctx => [
  postcssNext(),
  postcssAssets({ relative: true })
];
