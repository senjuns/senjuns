import axios, { AxiosRequestConfig } from 'axios';
import * as AWS from 'aws-sdk';
AWS.config.update({ region: 'us-west-2' });

const cognito = new AWS.CognitoIdentityServiceProvider;

test('with valid hasura admin secret', async () => {
  const axiosParam: AxiosRequestConfig = {
    url: 'https://hasura-spyder.dev.neatleaf.com/v1/graphql',
    method: 'post',
    headers: {
      // get the HASURA_GRAPHQL_ADMIN_SECRET from the AWS SecretsManager in dev! and set:
      // export HASURA_GRAPHQL_ADMIN_SECRET=...
      'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET || '',
    },
    data: {
      query: 'dab',
    },
  };
  let result;
  try {
    result = await axios(axiosParam);
  } catch (error) {
    console.debug(error);
    fail(error);
  }
  console.debug(result.data);
  expect(result.status).toEqual(200);
  expect(result.data.errors[0].message).toEqual('not a valid graphql query');
});

test('with wrong hasura admin secret', async () => {
  const axiosParam: AxiosRequestConfig = {
    url: 'https://hasura-spyder.dev.neatleaf.com/v1/graphql',
    method: 'post',
    headers: {
      'x-hasura-admin-secret': 'IamWrong',
    },
    data: {
      query: 'dab',
    },
  };
  let result;
  try {
    result = await axios(axiosParam);
  } catch (error) {
    console.debug(error);
    fail(error);
  }
  console.debug(result.data);
  expect(result.data.errors[0].message).toEqual('invalid x-hasura-admin-secret/x-hasura-access-key');
});

test('user token is valid', async () => {
  // user token test with https://newbedev.com/how-to-generate-access-token-for-an-aws-cognito-user
  // make sure your env has access to the dev env with like ~/.aws/credentials or using variables from the SSO login

  const params: AWS.CognitoIdentityServiceProvider.Types.AdminInitiateAuthRequest = {
    ClientId: '1ldi402p2trphraetn9ap3lnfm',
    UserPoolId: 'us-west-2_qgGFY5lXi',
    AuthFlow: 'ADMIN_NO_SRP_AUTH',
    AuthParameters: {
      USERNAME: 'spyderdev',
      PASSWORD: 'spyderdev123!'
    },
  };

  const tokenResult = await cognito.adminInitiateAuth(params).promise();
  const token = tokenResult.AuthenticationResult?.AccessToken;

  console.debug(token);

  const axiosParam: AxiosRequestConfig = {
    url: 'https://hasura-spyder.dev.neatleaf.com/v1/graphql',
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      query: 'dab',
    },
  };
  let result;
  try {
    result = await axios(axiosParam);
  } catch (error) {
    console.debug(error);
    fail(error);
  }
  // console.debug(result.data);
  expect(result.data.errors[0].message).toEqual('claims key: \'https://hasura.io/jwt/claims\' not found');
});

test('user token is not valid', async () => {

  const invalidToken = 'eyJraWQiOiJZdGZmaEM3N0trQjZ5V3JMXC8xOEVGK25uOEwweGZMUnJjY3hzQ2t3NGg1VT0iLCJhbGciOiJSUzI1NiJ9.eyJvcmlnaW5fanRpIjoiODMwYjA5MTMtMjM5Zi00Nzk4LWIzZjgtODI4NTNkMDk3NTEzIiwic3ViIjoiYzJmYjM0ZTEtMzcwYy00ZDBkLTk4MjItMTlmOTNjYzhmMzE2IiwiZXZlbnRfaWQiOiI2ZWMxNmM5NC1hMjQ2LTRhNWUtOTBkNi0zNjcxM2NlOTU1OTkiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjQwMTY0MDMwLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9xZ0dGWTVsWGkiLCJleHAiOjE2NDAxNjc2MzAsImlhdCI6MTY0MDE2NDAzMCwianRpIjoiN2YzNjllMjYtZjk3OS00ZTVkLWE2YzUtNmE1MGJkMTNkZjBhIiwiY2xpZW50X2lkIjoiMWxkaTQwMnAydHJwaHJhZXRuOWFwM2xuZm0iLCJ1c2VybmFtZSI6InNweWRlcmRldiJ9.C7b-Aowj0KbqS8zB-ixkXWaLVzHdbJIaLDmQB-JT_vXrrvN-CGvmNX7uIFJAG6GFBznaf8oVrHmAUI0WdeG0tFxm8kFEiG7znm4M-rdKpJVEMdky77B9JeAsWHiMnQLFBKYh_hRIzqAD6-N_-xGMtCWtIow_9zsI8Mx8RNLB2PHa-OyqH-5f6_O3z82Mmn-PmG9eQv3XIn1PnTKmc_hqTIcA5hYaZXp9WnLyCItAMWrlc5qAvdmAq9p-T6koGyC1LIJFBYUXO44fF8SU0Sz7ISqYc3AKHtM08_UlZiBT9zV4uW3W4RtJgT7dxMSPWYM0ZljoOoh9zgAG-gWxNPsNth';

  const axiosParam: AxiosRequestConfig = {
    url: 'https://hasura-spyder.dev.neatleaf.com/v1/graphql',
    method: 'post',
    headers: {
      Authorization: `Bearer ${invalidToken}`,
    },
    data: {
      query: 'dab',
    },
  };
  let result;
  try {
    result = await axios(axiosParam);
  } catch (error) {
    console.debug(error);
    fail();
  }
  console.debug(result);
  expect(result.data.errors[0].extensions.code).toBe('invalid-jwt');
});