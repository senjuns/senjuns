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