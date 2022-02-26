import * as pj from 'projen';

const project = new pj.typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'senjun-teams',
  projenrcTs: true,
  eslint: true,
  prettier: true,
  prettierOptions: {
    settings: {
      singleQuote: true,
    },
  },
  devDeps: ['commithelper', 'husky', 'lint-staged'],
});

project.package.addField('lint-staged', {
  '*.(ts|tsx)': ['eslint --fix'],
  '*.(ts|tsx|js|jsx|json)': ['prettier --write'],
});
project.setScript('lint:staged', 'lint-staged');

project.setScript('prepare', 'husky install');

project.synth();

const landingpage = new pj.web.ReactTypeScriptProject({
  defaultReleaseBranch: 'main',
  outdir: 'landingpage',
  parent: project,
  name: 'landingpage',
  deps: [
    'react-router-dom@5.2.0',
    'react-scripts@5.0.0',
    'styled-components',
    'axios',
    'react-responsive@^9.0.0-beta.6',
  ],
  devDeps: ['@types/styled-components', '@types/react-router-dom@^5.3.2'],
});

landingpage.synth();

const backend = new pj.awscdk.AwsCdkTypeScriptApp({
  defaultReleaseBranch: 'main',
  outdir: 'backend',
  parent: project,
  name: 'backend',
  cdkVersion: '2.14.0',
  devDeps: ['@types/aws-lambda', 'aws-sdk'],
});

backend.setScript('cdk', 'cdk');
backend.setScript('tsc', 'tsc');

backend.synth();

const dashboard = new pj.web.ReactTypeScriptProject({
  defaultReleaseBranch: 'main',
  outdir: 'dashboard',
  parent: project,
  name: 'dashboard',
  deps: [
    '@apollo/client@^3.3.20',
    'apollo-boost@^0.4.9',
    'react-apollo@^3.1.5',
    '@material-ui/core@^4.12.3',
    '@material-ui/icons@^4.11.2',
    '@material-ui/lab@^4.0.0-alpha.58',
    '@material-ui/pickers@^3.3.10',
    'aws-amplify@^4.2.0',
    'aws-amplify-react@^5.0.2',
    'react-router-dom@^5.2.0',
    'react-ga@^3.3.0',
    'styled-components@^5.3.1',
    'react-color@^2.19.3',
    'use-debounce@^7.0.1',
    '@date-io/date-fns@latest',
    '@date-io/moment@1.1.0',
    'date-fns@^2.23.0',
    'plotly.js@^2.3.0',
    'react-plotly.js@^2.5.1',
    'lodash',
    'konva@^8.2.2',
    'react-konva@^17.0.2-5',
    'use-image@^1.0.8',
    'clsx@^1.1.1',
    'react-zoom-pan-pinch@^2.1.3',
    'react-swipeable@^6.2.0',
    'react-tooltip@^4.2.21',
    'js-cookie@^3.0.1',
    'react-responsive@^9.0.0-beta.4',
    'react-hook-form@7.14.2',
    'selenium-webdriver@^4.1.1',
    'moment',
    'stream',
  ],
  eslint: true,
  prettier: true,
  prettierOptions: {
    settings: {
      singleQuote: true,
    },
  },
  devDeps: [
    '@graphql-codegen/typescript-react-apollo@^3.1.6',
    '@types/react-router-dom@^5.1.7',
    '@types/styled-components@^5.1.9',
    '@types/react-test-renderer@^17.0.1',
    'react-test-renderer@^17.0.2',
    '@types/react-color@^3.0.6',
    '@types/react-plotly.js@^2.5.0',
    '@types/lodash',
    '@types/js-cookie@^3.0.1',
    '@types/selenium-webdriver@^4.0.16',
    'assert',
  ],
});

dashboard.synth();
