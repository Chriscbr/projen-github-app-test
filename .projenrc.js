const { cdk, github } = require('projen');

const project = new cdk.JsiiProject({
  defaultReleaseBranch: 'main',
  name: 'projen-test-component-1',
  author: 'Christopher Rybicki',
  authorAddress: 'crybicki98@gmail.com',
  repositoryUrl: 'https://github.com/Chriscbr/projen-test-component-1',

  projenCredentials: github.GithubCredentials.fromApp(),

  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ['chriscbr-bot[bot]'],
    secret: 'GITHUB_TOKEN',
  },

  peerDeps: [
    'projen',
  ],

  releaseToNpm: true,

  mergify: false,
});

project.synth();
