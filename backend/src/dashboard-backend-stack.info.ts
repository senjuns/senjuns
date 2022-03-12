const login_client_id = process.env.login_client_id || '';
const cognito_user_pool = process.env.cognito_user_pool || '';
const cognito_pool_address = process.env.cognito_pool_address || '';
const identity_pool_id = process.env.identity_pool_id || '';
const aws_appsync_graphqlEndpoint =
  process.env.aws_appsync_graphqlEndpoint || '';

export async function handler(event: any) {
  console.debug(`event: ${JSON.stringify(event)}`);

  return {
    body: JSON.stringify({
      login_client_id,
      cognito_user_pool,
      cognito_pool_address,
      identity_pool_id,
      aws_appsync_graphqlEndpoint,
    }),
    statusCode: 200,
  };
}
