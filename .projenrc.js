const { awscdk, YamlFile } = require('projen');

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'projen-github-app-test',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */

  mergify: false,
});

new YamlFile(project, '.github/workflows/upgrade2.yml', {
  obj: {
    name: 'upgrade',
    on: { workflow_dispatch: {}, schedule: [{ cron: '0 0 * * *' }] },
    jobs: {
      upgrade: {
        'name': 'Upgrade',
        'runs-on': 'ubuntu-latest',
        'permissions': { contents: 'read' },
        'outputs': {
          patch_created: '${{ steps.create_patch.outputs.patch_created }}',
        },
        'steps': [
          { name: 'Checkout', uses: 'actions/checkout@v2' },
          {
            name: 'Install dependencies',
            run: 'yarn install --check-files --frozen-lockfile',
          },
          { name: 'Upgrade dependencies', run: 'npx projen upgrade' },
          {
            id: 'create_patch',
            name: 'Find mutations',
            run: 'git add .\n' +
              'git diff --staged --patch --exit-code > .repo.patch || echo "::set-output name=patch_created::true"',
          },
          {
            if: 'steps.create_patch.outputs.patch_created',
            name: 'Upload patch',
            uses: 'actions/upload-artifact@v2',
            with: { name: '.repo.patch', path: '.repo.patch' },
          },
        ],
      },
      pr: {
        'name': 'Create Pull Request',
        'needs': 'upgrade',
        'runs-on': 'ubuntu-latest',
        'permissions': { 'contents': 'write', 'pull-requests': 'write' },
        'if': '${{ needs.upgrade.outputs.patch_created }}',
        'steps': [
          {
            name: 'Generate token',
            id: 'generate_token',
            uses: 'tibdex/github-app-token@v1',
            with: {
              app_id: '${{ secrets.PROJEN_APP_ID }}',
              private_key: '${{ secrets.PROJEN_APP_PRIVATE_KEY }}',
            },
          },
          {
            name: 'Checkout',
            uses: 'actions/checkout@v2',
            with: { token: '${{ steps.generate_token.outputs.token }}' },
          },
          {
            name: 'Download patch',
            uses: 'actions/download-artifact@v2',
            with: { name: '.repo.patch', path: '${{ runner.temp }}' },
          },
          {
            name: 'Apply patch',
            run: '[ -s ${{ runner.temp }}/.repo.patch ] && git apply ${{ runner.temp }}/.repo.patch || echo "Empty patch. Skipping."',
          },
          {
            name: 'Set git identity',
            run: 'git config user.name "github-actions"\n' +
              'git config user.email "github-actions@github.com"',
          },
          {
            name: 'Create Pull Request',
            id: 'create-pr',
            uses: 'peter-evans/create-pull-request@v3',
            with: {
              'token': '${{ steps.generate_token.outputs.token }}',
              'commit-message': 'chore(deps): upgrade dependencies\n' +
                '\n' +
                'Upgrades project dependencies. See details in [workflow run].\n' +
                '\n' +
                '[Workflow Run]: https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}\n' +
                '\n' +
                '------\n' +
                '\n' +
                '*Automatically created by projen via the "upgrade" workflow*',
              'branch': 'github-actions/upgrade',
              'title': 'chore(deps): upgrade dependencies',
              'body': 'Upgrades project dependencies. See details in [workflow run].\n' +
                '\n' +
                '[Workflow Run]: https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}\n' +
                '\n' +
                '------\n' +
                '\n' +
                '*Automatically created by projen via the "upgrade" workflow*',
              'author': 'github-actions <github-actions@github.com>',
              'committer': 'github-actions <github-actions@github.com>',
              'signoff': true,
            },
          },
        ],
      },
    },
  },
});

project.synth();
