import * as pj from 'projen';
import { TrailingComma } from 'projen/lib/javascript';

/**
 * The following are some better comments helper (https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
 * * That is so important
 * ! Deprecated stuff
 * ? being used as a question
 * TODO: aha
 * @param myParam The parameter for this method
 */
const project = new pj.typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'senjuns',
  projenrcTs: true,
  eslint: true,
  prettier: true,
  prettierOptions: {
    settings: {
      singleQuote: true,
      trailingComma: TrailingComma.ALL,
    },
  },
  devDeps: ['commithelper', 'husky', 'lint-staged'],
  release: true,
});
project.prettier?.addIgnorePattern('.eslintrc.json');
project.prettier?.addIgnorePattern('tsconfig.dev.json');
project.prettier?.addIgnorePattern('tsconfig.json');
project.prettier?.addIgnorePattern('backend/cdk.json');

project.package.addField('lint-staged', {
  '*.(ts|tsx)': ['eslint --fix'],
  '*.(ts|tsx|js|jsx|json)': ['prettier --write'],
});
project.setScript('lint:staged', 'lint-staged');

project.setScript('prepare', 'husky install');

project.package.addField('commithelper', {
  scopes: ['dashboard', 'landingpage', 'backend', 'docs'],
});

project.tsconfigDev?.addInclude('backend/**/*.ts');

project.synth();

const landingpage = new pj.web.ReactTypeScriptProject({
  defaultReleaseBranch: 'main',
  outdir: 'landingpage',
  parent: project,
  name: 'landingpage',
  deps: [
    'react-router-dom',
    'react-scripts',
    'styled-components',
    'axios',
    'react-responsive',
    'react-localization',
    'js-cookie@^3.0.1',
  ],
  devDeps: [
    '@types/styled-components',
    '@types/react-responsive',
    '@types/react-router-dom',
    '@types/js-cookie@^3.0.1',
  ],
  release: false,
});

landingpage.synth();

const cdkVersion = '2.31.0';
const backend = new pj.awscdk.AwsCdkTypeScriptApp({
  defaultReleaseBranch: 'main',
  outdir: 'backend',
  parent: project,
  name: 'backend',
  cdkVersion,
  devDeps: ['@types/aws-lambda', 'aws-sdk', 'cdk-dia', 'esno'],
  deps: [
    'got',
    'cdk-appsync-transformer@2.0.0-alpha.0',
    `@aws-cdk/aws-appsync-alpha@${cdkVersion}-alpha.0`,
    '@slack/bolt',
    'dotenv',
    '@cremich/cdk-bill-bot',
  ],
  gitignore: ['.env', 'diagram.dot', 'diagram.png', 'appsync'],
  release: true,
  tsconfig: {
    compilerOptions: {
      skipLibCheck: true,
    },
  },
});

backend.setScript('cdk', 'cdk');
backend.setScript('tsc', 'tsc');
// backend.setScript(
//   'dia',
//   'mkdir -p ../landingpage/build && mkdir -p ../dashboard/build && yarn synth && yarn cdk-dia --stacks senjuns-pipeline/prod/DashboardAppStack senjuns-pipeline/prod/DashboardBackendStack && mv diagram.png diagrams/dashboard.png && yarn cdk-dia --stacks senjuns-pipeline/prod/LandingPageStack && mv diagram.png diagrams/landingpage.png',
// );
backend.addTask('updateSchema', {
  description: 'Udates all places when changing the schema.graphql',
  exec: 'yarn synth && cd ../dashboard && yarn codegen && cd ..',
});

// Always update the diagram if manually synth
backend.cdkTasks.synth.exec(`
yarn cdk-dia --stacks senjuns-pipeline/prod/DashboardAppStack senjuns-pipeline/prod/DashboardBackendStack && mv diagram.png diagrams/dashboard.png &&
yarn cdk-dia --stacks senjuns-pipeline/prod/LandingPageStack && mv diagram.png diagrams/landingpage.png &&
yarn cdk-dia --stacks senjuns-slack-stack && mv diagram.png diagrams/slack.png
`);

backend.setScript(
  'buildReactApps',
  'cd ../dashboard && yarn build && cd ../landingpage && yarn build',
);

// project.defaultTask?.reset();
// project.defaultTask?.exec("esno .projenrc.ts");

// backend.cdkConfig.json.addOverride('app', 'npx esno src/pipeline-stack.ts');

// project.eslint?.addIgnorePattern("!.projenrc.ts");

backend.synth();

const dashboard = new pj.web.ReactTypeScriptProject({
  defaultReleaseBranch: 'main',
  outdir: 'dashboard',
  parent: project,
  name: 'dashboard',
  deps: [
    ...[
      '@aws-amplify/auth',
      '@aws-amplify/ui-components',
      '@aws-amplify/ui-react',
      'aws-appsync',
      'aws-amplify',
      'aws-amplify-react',
    ],
    'react-apollo',
    'react-color',
    'react-hook-form',
    'react-konva',
    'react-plotly.js',
    'react-query',
    'react-responsive',
    'react-router-dom@^5.2.0',
    'react-swipeable',
    'react-tooltip',
    '@apollo/client',
    'apollo-boost',
    '@material-ui/core',
    '@material-ui/icons',
    '@material-ui/lab',
    '@material-ui/pickers',
    // 'react-ga@^3.3.0',
    'styled-components',
    'use-debounce',
    '@date-io/date-fns',
    '@date-io/moment',
    'date-fns',
    'plotly.js',
    'lodash',
    'konva',
    'use-image@',
    'clsx',
    'react-zoom-pan-pinch',
    'js-cookie',
    'selenium-webdriver@^4.1.1',
    'moment',
    'stream',
  ],
  devDeps: [
    ...[
      'amplify-graphql-docs-generator@',
      '@graphql-codegen/cli',
      '@graphql-codegen/typescript',
      '@graphql-codegen/typescript-operations',
      '@graphql-codegen/typescript-react-query',
    ],
    '@graphql-codegen/typescript-react-apollo',
    '@types/react-router-dom@^5.1.7',
    '@types/styled-components',
    '@types/react-test-renderer',
    '@types/react-responsive',
    'react-test-renderer',
    '@types/react-color',
    '@types/react-plotly.js',
    '@types/lodash',
    '@types/js-cookie',
    '@types/selenium-webdriver',
    'assert',
  ],
  release: false,
  jest: false,
  jestOptions: {
    jestConfig: {
      transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
      },
    },
  },
});

dashboard.addTask('copy-schema', {
  exec: 'cp ../backend/appsync/schema.graphql ./schema.graphql',
});

dashboard.addTask('generate-statements', {
  exec: 'node bin/generateStatements.js',
});

dashboard.addTask('codegen', {
  description: 'Generates frontend GraphQL wrapper API code',
  exec: 'yarn run copy-schema && yarn run generate-statements && graphql-codegen --config codegen.yml && rm schema.graphql',
});

dashboard.setScript(
  'build:config',
  'cd scripts/create_config; yarn; yarn start; cd -',
);

dashboard.setScript(
  'dev',
  'export STAGE=prod && yarn build:config && REACT_APP_STAGE=prod react-scripts start',
);
// only have prod atm
// dashboard.setScript('start:prod', 'build:config && react-scripts start');

dashboard.addGitIgnore('src/shared/config/config.ts');

dashboard.synth();
