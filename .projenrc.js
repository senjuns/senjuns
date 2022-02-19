const { awscdk, typescript, web } = require('projen');
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'senjun-teams',
});

project.synth();

const devops = new awscdk.AwsCdkTypeScriptApp({
  defaultReleaseBranch: 'main',
  outdir: 'devops',
  parent: project,
  name: 'devops',
  cdkVersion: '2.12.0',
});

devops.setScript('cdk', 'cdk');
devops.synth();

const landingpage = new web.ReactTypeScriptProject({
  defaultReleaseBranch: 'main',
  outdir: 'landingpage',
  parent: project,
  name: 'landingpage',
  deps: [],
  prettier: true,
  // prettierOptions: {
  //   settings: {
  //     singleQuote: true,
  //   },
  // },
  devDeps: [
    'lint-staged',
    'husky',
  ],
  tsconfig: {
    compilerOptions: {
      // forceConsistentCasingInFileNames: false,
      // strictNullChecks: false,
    },
    // exclude: ['**/node_modules/**/*.ts'],
  },

  // releaseWorkflow: false,
});

landingpage.package.addField('lint-staged', {
  '*.(ts|tsx)': [
    'eslint --fix',
  ],
  '*.(ts|tsx|js|jsx|json)': [
    'prettier --write',
  ],
});

landingpage.addTask('prepare', 'cd .. && husky install');
landingpage.addTask('lint:staged', 'lint-staged');
landingpage.synth();

const dashboard = new web.ReactTypeScriptProject({
  defaultReleaseBranch: 'main',
  outdir: 'dashboard',
  parent: project,
  name: 'dashboard',
  deps: [],
  devDeps: [],
  tsconfig: {
    compilerOptions: {
      // forceConsistentCasingInFileNames: false,
      // strictNullChecks: false,
    },
    // exclude: ['**/node_modules/**/*.ts'],
  },

  // releaseWorkflow: false,
});

dashboard.synth();