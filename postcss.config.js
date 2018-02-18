const postcssAssets = require('postcss-assets')
const postcssNext = require('postcss-cssnext')
const stylelint = require('stylelint')

module.exports = ({ options }) => Object.assign({}, options, {
  plugins: [
    stylelint(),
    postcssNext(),
    postcssAssets({ relative: true }),
  ],
})
