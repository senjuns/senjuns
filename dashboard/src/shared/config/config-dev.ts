export const config: any = {
  gaTrackingId: 'AB-1234568-9',
  aws_hasura_graphqlEndpoint:
    'https://dashboard-hasura.dev.neatleaf.com/v1/graphql',
  aws_project_region: 'us-west-2',
  aws_cognito_identity_pool_id:
    'COGNITO_DASHBOARD_APP_USER_POOL_IDENTITY_POOL_ID',
  aws_cognito_region: 'us-west-2',
  aws_user_pools_id: 'USER_POOL_ID',
  aws_user_pools_web_client_id: 'USER_POOL_WEB_CLIENT',
  aws_appsync_graphqlEndpoint:
    'https://uijj43arhnc2hmjcycwjzt3eyu.appsync-api.us-west-2.amazonaws.com/graphql',
  aws_appsync_region: 'us-west-2',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  aws_appsync_apiKey: 'da2-fakeApiId123456',
  aws_content_delivery_bucket: 'ladybeetle-hostingbucket-dev',
  aws_content_delivery_bucket_region: 'us-west-2',
  aws_content_delivery_url: 'https://d2ewqb7falxfxe.cloudfront.net',
  Auth: {
    identityPoolId: 'COGNITO_DASHBOARD_APP_USER_POOL_IDENTITY_POOL_ID',
    region: 'us-west-2',
    userPoolId: 'USER_POOL_ID',
    userPoolWebClientId: 'USER_POOL_WEB_CLIENT',
  },
  Storage: {
    AWSS3: {
      bucket: 'dev-spyder-v1-imagebucket',
      region: 'us-west-2',
    },
  },
  oauth: {
    domain: 'neatleaf-enmo-test.auth.us-west-2.amazoncognito.com',
    scope: ['email', 'openid'],
    redirectSignIn: 'http://localhost:3000/',
    redirectSignOut: 'http://localhost:3000/',
    responseType: 'code',
  },
  federationTarget: 'COGNITO_USER_AND_IDENTITY_POOLS',
};

export default config;
