# backend

## AWS component diagram

This diagram can be generated out of the CDK code with `yarn dia`

### Landingpage

![landingpage.png](diagrams/landingpage.png)

### Dashboard

![dashboard.png](diagrams/dashboard.png)

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
yarn cdk deploy 'dev-...Stack'
yarn cdk deploy 'dev-...Stack' --watch
yarn cdk deploy 'dev-...Stack' --require-approval never
yarn cdk deploy 'senjuns-pipeline/prod/DashboardBackendStack' --require-approval never
yarn cdk deploy 'senjuns-pipeline/prod/DashboardAppStack' --require-approval never
yarn cdk deploy 'senjuns-pipeline/prod/LandingpageStack' --require-approval never
```

For destroy do

```bash
yarn destroy
```

For setup access to the specific stage get your programmatic credentials via AWS SSO and store them in ~/.aws/credentials or more convenient store them as environment variables.

## Deploy Pipeline

```bash
yarn cdk deploy 'senjuns-pipeline' --require-approval never
```

## Cognito

Create User

```bash
REGION=eu-central-1

aws cognito-idp admin-create-user --user-pool-id $USER_POOL_ID --username $USER_NAME --user-attributes Name=email,Value=$USER_NAME --region $REGION
aws cognito-idp admin-set-user-password --user-pool-id $USER_POOL_ID --username $USER_NAME --password $USER_PASSWORD  --permanent --region $REGION
```

## Migration

Future tasks when we get funding:

- Setup proper multi accounts with landingpage and more. Perhaps use kreuzwerker template.
- Change 'senjuns-pipeline/prod/prod-DashboardBackendStack' to 'senjuns-pipeline/prod/DashboardBackendStack'
