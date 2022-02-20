import * as pj from 'projen';

const project = new pj.typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'senjun-teams',
  projenrcTs: true,
});

project.synth();

const landingpage = new pj.web.ReactTypeScriptProject({
  defaultReleaseBranch: 'main',
  outdir: 'landingpage',
  parent: project,
  name: 'landingpage',
  deps: [
    'react-router-dom@5.2.0',
    // 'react-router',
    'react-scripts@5.0.0',
    'styled-components',
    'axios',
    'react-responsive@^9.0.0-beta.6',
  ],
  eslint: true,
  prettier: true,
  prettierOptions: {
    settings: {
      singleQuote: true,
    },
  },
  devDeps: [
    'lint-staged',
    'husky',
    '@types/styled-components',
    '@types/react-router-dom@^5.3.2',
  ],
});

landingpage.package.addField('lint-staged', {
  '*.(ts|tsx)': ['eslint --fix'],
  '*.(ts|tsx|js|jsx|json)': ['prettier --write'],
});

landingpage.setScript('prepare', 'cd .. && husky install');
landingpage.setScript('lint:staged', 'lint-staged');
landingpage.synth();

const devops = new pj.awscdk.AwsCdkTypeScriptApp({
  defaultReleaseBranch: 'main',
  outdir: 'devops',
  parent: project,
  name: 'devops',
  cdkVersion: '2.12.0',
});

devops.setScript('cdk', 'cdk');
devops.synth();

const dashboard = new pj.web.ReactTypeScriptProject({
  defaultReleaseBranch: 'main',
  outdir: 'dashboard',
  parent: project,
  name: 'dashboard',
  deps: [],
  eslint: true,
  prettier: true,
  prettierOptions: {
    settings: {
      singleQuote: true,
    },
  },
  devDeps: ['lint-staged', 'husky'],
});

dashboard.package.addField('lint-staged', {
  '*.(ts|tsx)': ['eslint --fix'],
  '*.(ts|tsx|js|jsx|json)': ['prettier --write'],
});

dashboard.setScript('prepare', 'cd .. && husky install');
dashboard.setScript('lint:staged', 'lint-staged');

dashboard.synth();
