# CDK Deployment

This repository contains [AWS CDK](https://aws.amazon.com/cdk/) for Infrastructure as Code (IaC).

## Adding a new sandbox

In order to add a new sandbox to the pipeline the following steps have to be accomplished:

* create new AWS sandbox and set the respective permissions for users
* provision new TimescaleDB instance
* store secretes in OnePassword vault and in the secret manager of the AWS sandbox
* set up ternary DNS for sandbox in Route53 <TBD>
* add instance to CDK pipeline

## Prerequisites

The following Secrets in the SecretsManager need to exist:

* TimeScaleDBConnectionString

The S3 data bucket named ${STAGE}-spyder-v1-databucket needs to be created via cli:

```bash
AWS_DEFAULT_REGION=us-west-2
BUCKET_NAME=${STAGE}-spyder-v1-databucket
aws s3api create-bucket --bucket BUCKET_NAME
```

And the S3 image bucket named ${STAGE}-spyder-v1-imagebucket:

```bash
AWS_DEFAULT_REGION=us-west-2
BUCKET_NAME=${STAGE}-spyder-v1-imagebucket
aws s3api create-bucket --bucket BUCKET_NAME --acl public-read
```

Check if the particular stage has a cognito userpool and import it via the **userPoolId** Stage property in devops/src/main.ts or let it undefined if a new userpool needs to be created.

## How to deploy locally

**Notice:** Deploying shouldn't be done manually if not necessary! The BitBucket pipeline can and should deploy changes. Anyway if you decide deploy manually read the next sections.

${STAGE} can be dev, sqa, staging or prod.

Synthing the CDK APP can be done with going to devops/${STAGE} and run:

```bash
yarn synth
```

To deploy a certain CDK Stack like the HasuraStack go to devops/${STAGE}/hasura make sure your credentials are setup to access ${STAGE}:

```bash
yarn deploy
```

Or with the new watch flag a faster deploying for local development:

```bash
yarn cdk deploy 'dev-SpyderStack' --watch
```

For destroy do

```bash
yarn destroy
```

For setup access to the specific stage get your programmatic credentials via AWS SSO and store them in ~/.aws/credentials or more convenient store them as environment variables.

### Test Stacks

Here are some tests mentioned for ensuring the functionality of the created stacks.

#### DashboardStack

Test login flow:

1) Login with your dashboard user pool user. (Check in Cognito if the user exists and if the password might needs to be reset. You can do that with the password reset feature in the login screen)
2) After successfully check with the browser dev tool if the graphql requests are properly processed

#### Spyderstack

Test PB flow:

1) Create a folder named upload in the data bucket (called similar to ${STAGE}-spyder-v1-databucket)
2) In the upload folder upload a valid pb file
3) Check the data2 lambda logs if the pb files was successfully processed
4) Check the heatmap lambda logs

### Deployment CFN Stack Outputs

Important CFN (Cloudformation) Outputs can be viewed in the AWS Console --> Cloudformation --> STACK --> Outputs

### Misc

The cdk.context.json is an important file for CDK. It serves as lookup during deploy and shouldn't be git ignored or manually changed!

## CDK Boostrap

For using the cdk deploy you need to bootstrap all the involved accounts! There are bootstrap commands in:

* package.json - bootstrap the build account
* ${STAGE}/package.json - bootstrap the specific stage Account

## Pipeline specifics

### Hasura Secrets

The Hasura deployments needs some secrets like the db url, admin password and jwt password. Those secrets need to be setup either manually in AWS Console --> AWS SecretsManager or you can use the AWS sdk script components/post-deploy.ts. But working with the script you need to make sure that your aws credentials are pointing to the account where you want to setup the secrets.

## Troubleshooting

* check if the AWS SecretsManager Secrets are correct
* In the AWS Console use the ECS logs.
* In AWS Console --> Cloudformation check the logs of the failing stack (like hasura)
* Hasura ECS Secrets might not be updated on the fly like the Hasura Admin Secret. To update it simply reboot the Ec2 scaling instance.
* A CDK Bootstrap might fix your problem. See Bootstrap section. Continually updating of the cdk version might outdated the Cdk helper stack.

## Using Hasura

### Hasura UI

For using the Hasura UI use the Hasura url e.g. https://dashboard-hasura.dev.neatleaf.com or https://spyder-hasura.dev.neatleaf.com . Find the password in AWS SecretsManager --> hasura-HasuraDashboardAdminSecret or hasura-HasuraSpyderAdminSecret .

### Hasura GraphQL Query

...

## Route 53

As we are using proper domains like dashboard.dev.neatleaf.com those need hosted zones like dev.neatleaf.com . I will explain how to setup such domain with the dashboard.dev.neatleaf.com example.

* log into the dev account
* create the hosted zone dev.neatleaf.com
* copy the created nameservers
* log into the prod account which contains the root neatleaf.com hosted zone
* create a new record with prefix dev and change the type to name server
* at the value insert the copied nameservers from dev.neatleaf.com

### Backup

A lambda is regularly backing up the cognito users into an CSV file stored in an S3. For restoring the users into a Cognito User Pool you need to use the AWS Console and import that CSV file. Therefore:

* Download the backup CSV file in the current format backup-${Date.now()}.csv .
* Go to Cognito "Users and groups" --> Import users --> Create import job
* Choose a job name . Choose the prepared IAM role name similar ${stage}-CognitoStack-userImportRole...
* Choose the downloaded CSV file and import the users
* For recreating the groups and users belonging to a specific group use the backup-${Date.now()}-group.json file. But unfortunately it has to be done manually.

If you need to troubleshoot there is a log group you can use under /aws/cognito

## Cognito

The CDK scripts create the cognito pools, but these commands may be useful for manually creating users or setting their passwords:

For using components like the dashboard you need to setup your cognito user.

Manually change the cognito password from a user with:

```bash
 aws cognito-idp admin-set-user-password --user-pool-id  us-west-2_dPjbVdzbq  --username martin.mueller@opreto.com --password martinsqa    --permanent --region us-west-2
```

Change custom attribute like custom:organization_id

```bash
aws cognito-idp admin-update-user-attributes --user-pool-id us-west-2_dPjbVdzbq --username martin.mueller@opreto.com --user-attributes Name=custom:organization_id,Value=2 --region us-west-2
```

Create User with custom attribute directly.

```bash
aws cognito-idp admin-create-user \
    --user-pool-id us-west-2_dPjbVdzbq \
    --username martin.mueller@opreto.com \
    --user-attributes Name=custom:organization_id,Value=2 Name=email,Value=martin.mueller@opreto.com Name=email_verified,Value=TRUE \
    --message-action SUPPRESS \
    --region us-west-2
```

To set a user's password as permenant (not requiring the temporary password to be reset by the user), use the following command:

```bash
aws cognito-idp admin-set-user-password \
--user-pool-id  $COGNITO_POOL_ID \
--username $EMAIL --password $PASSWORD --permanent
```

If you want to script this for generate larger groups of users, the following short script may be useful:

```bash
# dashboard dev:
COGNITO_POOL_ID="<GET COGNITO POOL ID>"
EMAIL="<USER>@neatleaf.com"
NAME="<NAME>"
PASSWORD="<PASSWORD>"

aws cognito-idp admin-create-user --user-pool-id $COGNITO_POOL_ID \
--username $EMAIL \
--user-attributes Name=given_name,Value=$NAME Name=email,Value=$EMAIL Name=email_verified,Value=true

aws cognito-idp admin-set-user-password \
--user-pool-id  $COGNITO_POOL_ID \
--username $EMAIL --password $PASSWORD --permanent
```
