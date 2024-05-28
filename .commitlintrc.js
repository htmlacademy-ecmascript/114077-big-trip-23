export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [0, 'always', 200],
    'type-enum': [
      2,
      'always',
      ['build', 'chore', 'docs', 'feat', 'fix', 'perf', 'polish', 'refactor', 'release', 'revert', 'style', 'test', 'types'],
    ],
  },
};
