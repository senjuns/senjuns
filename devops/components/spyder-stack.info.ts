const account_id = process.env.account_id || '';
const login_client_id = process.env.login_client_id || '';
const cognito_user_pool = process.env.cognito_user_pool || '';
const cognito_pool_address = process.env.cognito_pool_address || '';
const identity_pool_id = process.env.identity_pool_id || '';
const proto_bucket = process.env.proto_bucket || '';
const software_bucket = process.env.software_bucket || '';
const logging_table = process.env.logging_table || '';

export async function handler(event: any) {
  console.debug(`event: ${JSON.stringify(event)}`);

  return {
    body: JSON.stringify({
      account_id,
      login_client_id,
      cognito_user_pool,
      cognito_pool_address,
      identity_pool_id,
      proto_bucket,
      software_bucket,
      logging_table,
    }),
    statusCode: 200,
  };
}