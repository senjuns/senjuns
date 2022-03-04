# backend

## How to deploy locally

**Notice:** Deploying shouldn't be done manually if not necessary! The BitBucket pipeline can and should deploy changes. Anyway if you decide deploy manually read the next sections.

${STAGE} can be dev or prod.

Synthing the CDK APP can be done with going to backend/${STAGE} and run:

```bash
yarn synth
```

Deploy with:

```bash
yarn deploy
```

For listing all available stacks do:

```bash
yarn cdk list
```

Or with the new watch flag a faster deploying for local development:

```bash
yarn cdk deploy 'prod-DashboardBackendStack'
yarn cdk deploy 'prod-DashboardAppStack'
yarn cdk deploy 'prod-LandingpageStack'
yarn cdk deploy 'dev-...Stack'
yarn cdk deploy 'dev-...Stack' --watch
yarn cdk deploy 'dev-...Stack' --require-approval none
yarn cdk deploy 'senjun-teams-pipeline/prod/prod-DashboardBackendStack'
```

For destroy do

```bash
yarn destroy
```

For setup access to the specific stage get your programmatic credentials via AWS SSO and store them in ~/.aws/credentials or more convenient store them as environment variables.

## Deploy Pipeline

```bash
yarn cdk deploy 'senjun-teams-pipeline' --require-approval none
```

## Cognito

Create User

```bash
USER_POOL_ID=eu-central-1_tQoQRbDHI
USER_NAME=martin
USER_PASSWORD=M@rtindev1
REGION=eu-central-1

aws cognito-idp admin-create-user --user-pool-id $USER_POOL_ID --username $USER_NAME --region $REGION
aws cognito-idp admin-set-user-password --user-pool-id $USER_POOL_ID --username $USER_NAME --password $USER_PASSWORD  --permanent --region $REGION
```
