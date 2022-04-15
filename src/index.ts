import { Component, javascript, TextFile } from 'projen';

export class ContributingFile extends Component {
  constructor(project: javascript.NodeProject) {
    super(project);

    new TextFile(project, 'CONTRIBUTING.md', {
      lines: [
        '# Contributing',
        '',
        'Run the following commands to set up your project:',
        '```',
        `${project.package.installCommand}`,
        '```',
      ],
    });
  }
}
