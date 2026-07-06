module.exports = {
  types: [
    { value: 'feat', name: '✨ feat:\tAdding a new feature' },
    { value: 'fix', name: '🐛 fix:\tFixing a bug' },
    { value: 'docs', name: '📝 docs:\tAdd or update documentation' },
    {
      value: 'refactor',
      name: '♻️  refactor:\tCode change that neither fixes a bug nor adds a feature'
    },
    {
      value: 'chore',
      name: '🚚 chore:\tChanges to the build process or auxiliary tools and libraries such as CICD'
    },
    { value: 'revert', name: '⏪️ revert:\tRevert to a commit' }
  ],
  scopes: [],

  scopeOverrides: {
    fix: [{ name: 'merge' }, { name: 'style' }, { name: 'test' }, { name: 'hotfix' }]
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  skipQuestions: ['scope', 'footer', 'breaking'],
  subjectLimit: 100
};
