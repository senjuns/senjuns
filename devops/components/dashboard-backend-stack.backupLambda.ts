// eslint-disable-next-line import/no-extraneous-dependencies
import * as lambda from 'aws-lambda';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3;
const cognito = new AWS.CognitoIdentityServiceProvider;

const bucketName = process.env.BUCKET_NAME || '';
const dashboardUserPoolId = process.env.DASHBOARD_USERPOOL_ID || '';

export async function handler(event: lambda.CloudFormationCustomResourceEvent | any) {
  // exports.handler = async (event/*: lambda.DynamoDBStreamEvent*/) => {
  console.debug(`event: ${JSON.stringify(event)}`);

  // ignoring the CFN Create event as the export would be anyway empty. CFN Update and Delete will not be ignored!
  if ((event as lambda.CloudFormationCustomResourceEvent).RequestType === 'Create') {
    return;
  }

  const dateNow = Date.now();

  // get dashboard user data
  const param: AWS.CognitoIdentityServiceProvider.Types.ListUsersRequest = {
    UserPoolId: dashboardUserPoolId,
  };
  const users = await cognito.listUsers(param).promise();
  console.debug(`users: ${JSON.stringify(users)}`);

  const exportCsvFields = ['name', 'given_name', 'family_name', 'middle_name', 'nickname',
    'preferred_username', 'profile', 'picture', 'website', 'email', 'email_verified', 'gender',
    'birthdate', 'zoneinfo', 'locale', 'phone_number', 'phone_number_verified', 'address',
    'updated_at', 'cognito:mfa_enabled', 'cognito:username', 'custom:organization_id']
  let exportCsv = exportCsvFields.join(',');
  users.Users?.map((user) => {
    console.debug(`user: ${JSON.stringify(user)}`);
    const newCognitoCsv: CognitoCsv = {
      name: user.Username || '',
      given_name: user.Attributes?.filter(attr => attr.Name === 'given_name')[0]?.Value || 'given_name',
      family_name: user.Attributes?.filter(attr => attr.Name === 'family_name')[0]?.Value || 'family_name',
      middle_name: '',
      nickname: '',
      preferred_username: '',
      profile: '',
      picture: '',
      website: '',
      email: user.Attributes?.filter(attr => attr.Name === 'email')[0]?.Value || '',
      email_verified: user.Attributes?.filter(attr => attr.Name === 'email_verified')[0]?.Value || 'FALSE',
      gender: '',
      birthdate: '',
      zoneinfo: '',
      locale: '',
      phone_number: user.Attributes?.filter(attr => attr.Name === 'phone_number')[0]?.Value || '123',
      phone_number_verified: user.Attributes?.filter(attr => attr.Name === 'phone_number_verified')[0]?.Value || 'FALSE',
      address: '',
      updated_at: '',
      'cognito:mfa_enabled': 'FALSE',
      'cognito:username': user.Username || '',
      'custom:organization_id': user.Attributes?.filter(attr => attr.Name === 'custom:organization_id')[0]?.Value || '0',
    }
    console.debug(`newCognitoCsv: ${JSON.stringify(newCognitoCsv)}`);
    const userCsvArray = [
      newCognitoCsv.name, newCognitoCsv.given_name, newCognitoCsv.family_name, newCognitoCsv.middle_name, newCognitoCsv.nickname, newCognitoCsv.preferred_username,
      newCognitoCsv.profile, newCognitoCsv.picture, newCognitoCsv.website, newCognitoCsv.email, newCognitoCsv.email_verified,
      newCognitoCsv.gender, newCognitoCsv.birthdate, newCognitoCsv.zoneinfo, newCognitoCsv.locale, newCognitoCsv.phone_number, newCognitoCsv.phone_number_verified,
      newCognitoCsv.address, newCognitoCsv.updated_at, newCognitoCsv['cognito:mfa_enabled'], newCognitoCsv['cognito:username'], newCognitoCsv['custom:organization_id'],
    ];
    if (exportCsvFields.length !== userCsvArray.length) {
      console.log(`exportCsvFields.length: ${exportCsvFields.length}`)
      console.log(`userCsvArray.length: ${userCsvArray.length}`)
      throw Error('exportCsvFields.length !== userCsvArray.length');
    }
    exportCsv = exportCsv.concat('\n', userCsvArray.join(','));
  });

  const putObjectParams: AWS.S3.Types.PutObjectRequest = {
    Bucket: bucketName,
    Key: `backup-${dateNow}.csv`,
    Body: exportCsv,
  }
  // only backup if we have user to backup
  if (users.Users?.length ?? 0 > 0) {
    await s3.putObject(putObjectParams).promise();
  }

  // store users in groups
  const groups = await cognito.listGroups(param).promise();
  console.debug(`groups: ${JSON.stringify(groups)}`);

  let userGroups: { groupName: string; users: string[] }[] = [];
  for (const group of groups.Groups || []) {
    const param: AWS.CognitoIdentityServiceProvider.Types.ListUsersInGroupRequest = {
      UserPoolId: dashboardUserPoolId,
      GroupName: group.GroupName || '',
    };
    const users = await cognito.listUsersInGroup(param).promise();
    userGroups.push({ groupName: group.GroupName || '', users: users.Users?.map(user => user.Username ?? '') || [] })
  }
  const putObjectGroupsParam: AWS.S3.Types.PutObjectRequest = {
    Bucket: bucketName,
    Key: `backup-${dateNow}-groups.json`,
    Body: JSON.stringify(userGroups),
  }
  // only backup user groups if exist any
  if (userGroups.length > 0) {
    await s3.putObject(putObjectGroupsParam).promise();
  }
}

interface CognitoCsv {
  'name': string; 'given_name': string; 'family_name': string; 'middle_name': string; 'nickname': string;
  'preferred_username': string; 'profile': string; 'picture': string; 'website': string; 'email': string; 'email_verified': string; 'gender': string;
  'birthdate': string; 'zoneinfo': string; 'locale': string; 'phone_number': string; 'phone_number_verified': string; 'address': string;
  'updated_at': string; 'cognito:mfa_enabled': string; 'cognito:username': string; 'custom:organization_id': string;
}