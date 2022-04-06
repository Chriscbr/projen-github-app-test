const { awscdk, github } = require('projen');

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'projen-github-app-test',

  projenCredentials: github.GithubCredentials.fromApp(),

  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ['chriscbr-bot[bot]'],
    secret: 'GITHUB_TOKEN',
  },
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */

  mergify: false,
});

project.synth();
