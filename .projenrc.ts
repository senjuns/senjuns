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

const cdkVersion = '2.30.0';
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
      '@aws-amplify/auth@^4.3.8',
      '@aws-amplify/ui-components@^1.8.1',
      '@aws-amplify/ui-react@^1.2.18',
      'aws-appsync@^4.1.2',
    ],
    'react-query@^3',
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
    // 'react-ga@^3.3.0',
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
  devDeps: [
    ...[
      'amplify-graphql-docs-generator@^2.2.4',
      '@graphql-codegen/cli@*',
      '@graphql-codegen/typescript@*',
      '@graphql-codegen/typescript-operations@*',
      '@graphql-codegen/typescript-react-query@alpha',
    ],
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
