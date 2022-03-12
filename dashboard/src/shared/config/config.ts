const config = {
  gaTrackingId: 'AB-1234568-9',
  aws_project_region: 'eu-central-1',
  aws_cognito_identity_pool_id:
    'eu-central-1:33794287-1948-47a2-b830-8ee12111749e',
  aws_cognito_region: 'eu-central-1',
  aws_user_pools_id: 'eu-central-1_wi4nczkft',
  aws_user_pools_web_client_id: '6cfvsvdjgtjhui4u23h4l361nm',
  aws_appsync_graphqlEndpoint:
    'https://7nxor7wb3rexzjbykooi3uvoyq.appsync-api.eu-central-1.amazonaws.com/graphql',
  aws_appsync_region: 'eu-central-1',
  // aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  aws_appsync_authenticationType: 'AWS_IAM',
  Auth: {
    identityPoolId: 'eu-central-1:33794287-1948-47a2-b830-8ee12111749e',
    region: 'eu-central-1',
    userPoolId: 'eu-central-1_wi4nczkft',
    userPoolWebClientId: '6cfvsvdjgtjhui4u23h4l361nm',
  },
};

export default config;
