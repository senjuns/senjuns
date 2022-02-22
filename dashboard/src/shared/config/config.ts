export const config: any = {
  gaTrackingId: 'UA-179417847-2',
  aws_hasura_graphqlEndpoint:
    'https://dashboard-hasura.dev.neatleaf.com/v1/graphql',
  aws_project_region: 'us-west-2',
  aws_cognito_identity_pool_id:
    'us-west-2:6554116a-9656-4483-ba01-dc6d51ceed19',
  aws_cognito_region: 'us-west-2',
  aws_user_pools_id: 'us-west-2_3zgoEdJ3Z',
  aws_user_pools_web_client_id: '75s1peah34k3rmm307otr6ifpf',
  aws_appsync_graphqlEndpoint:
    'https://uijj43arhnc2hmjcycwjzt3eyu.appsync-api.us-west-2.amazonaws.com/graphql',
  aws_appsync_region: 'us-west-2',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  aws_appsync_apiKey: 'da2-fakeApiId123456',
  aws_content_delivery_bucket: 'ladybeetle-hostingbucket-dev',
  aws_content_delivery_bucket_region: 'us-west-2',
  aws_content_delivery_url: 'https://d2ewqb7falxfxe.cloudfront.net',
  Auth: {
    identityPoolId: 'us-west-2:6554116a-9656-4483-ba01-dc6d51ceed19',
    region: 'us-west-2',
    userPoolId: 'us-west-2_3zgoEdJ3Z',
    userPoolWebClientId: '75s1peah34k3rmm307otr6ifpf',
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
