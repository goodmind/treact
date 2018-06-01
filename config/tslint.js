const tsRules = {
  'interface-name': [
    true,
    'never-prefix',
  ],
  'no-non-null-assertion': true,
  'no-any': true,
  //'no-unsafe-any': true,
  //'no-inferred-empty-object-type': true,
  'no-var-requires': true,
}

const jsRules = {
  'indent': [
    true,
    'spaces',
    2,
  ],
  'quotemark': [
    true,
    'single',
    'jsx-double',
  ],
  'semicolon': [
    true,
    'never',
  ],
  'ordered-imports': [],
  'member-ordering': [
    false,
  ],
  'no-console': [
    false,
  ],
  'jsx-alignment': [
    false,
  ],
  'no-empty-interface': [
    false,
  ],
  'space-before-function-paren': [
    false,
  ],
  'no-consecutive-blank-lines': [
    false, ,
  ],
  'max-classes-per-file': [
    false, ,
  ],
  'comment-format': [
    false, ,
  ],
  /*'no-submodule-imports': [
    true,
    'containers',
    'components',
    'redux',
    'helpers',
    'api',
    'themes',
    'modules',
  ],*/
  'no-submodule-imports': false,
  'arrow-parens': false,
  'object-literal-sort-keys': false,
  'object-literal-key-quotes': [false],
  'no-shadowed-variable': false,
  'interface-over-type-literal': false,
  'prefer-const': true,
  'curly': false,
  'no-bitwise': false,
  'jsx-no-multiline-js': false,
  'jsx-boolean-value': false,
  'jsx-wrap-multiline': false,
  'prefer-object-spread': false,
  'no-implicit-dependencies': false,
}

module.exports = {
  extends: [
    'tslint:latest',
    'tslint-react',
  ],
  lintOptions: {
    typeCheck: true,
  },
  rules: Object.assign({}, tsRules, jsRules),
  jsRules,
}
