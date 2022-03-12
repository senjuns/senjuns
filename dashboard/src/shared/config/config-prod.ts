const config = {
  gaTrackingId: 'AB-1234568-9',
  aws_project_region: 'eu-central-1',
  aws_cognito_identity_pool_id:
    'COGNITO_DASHBOARD_APP_USER_POOL_IDENTITY_POOL_ID',
  aws_cognito_region: 'eu-central-1',
  aws_user_pools_id: 'USER_POOL_ID',
  aws_user_pools_web_client_id: 'USER_POOL_WEB_CLIENT',
  aws_appsync_graphqlEndpoint: 'AWS_APPSYNC_GRAPHQLENDPOINT',
  aws_appsync_region: 'eu-central-1',
  // aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  aws_appsync_authenticationType: 'AWS_IAM',
  Auth: {
    identityPoolId: 'COGNITO_DASHBOARD_APP_USER_POOL_IDENTITY_POOL_ID',
    region: 'eu-central-1',
    userPoolId: 'USER_POOL_ID',
    userPoolWebClientId: 'USER_POOL_WEB_CLIENT',
  },
};

export default config;
