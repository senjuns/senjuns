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
