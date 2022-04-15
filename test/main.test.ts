import { javascript, Testing } from 'projen';
import { ContributingFile } from '../src';

test('snapshot', () => {
  const project = new javascript.NodeProject({
    defaultReleaseBranch: 'main',
    name: 'test',
  });
  new ContributingFile(project);

  const output = Testing.synth(project);
  expect(output['CONTRIBUTING.md']).toMatchInlineSnapshot(`
"# Contributing

Run the following commands to set up your project:
\`\`\`
yarn install --check-files --frozen-lockfile
\`\`\`"
`);
});