# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

Start locally against a stage (dev, sqa, qa, prod):

```bash
chmod +x ./scripts/create_config.sh
export STAGE=dev
REACT_APP_STAGE=$STAGE yarn start
```

Keep in mind if you use a stage like dev or one of the other you will need to have an account in cognito. The steps are:

1. log into aws dev account
2. create user in Cognito user pool
3. adjust cognito password and state with:

```bash
aws cognito-idp admin-set-user-password --user-pool-id  us-west-2_XXXXX --username martin.mueller@opreto.com --password martindev  --permanent --region us-west-2
```

4. use S3 Website url or start locally (see above for instructions)

### `yarn test`

Runs the unit and e2e tests in the project.

### `yarn test:e2e`

Runs the e2e tests which are written in Selenium.
It has several browsers(chrome/firefox/safari) and runs the e2e tests on each browsers.

### `yarn test:unit`

Runs the unit tests which are written in Jest.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test:watch`

Runs the unit tests in watch mode.
Watch mode is the mode when the tests are running automatically when you make changes in the source.

### `yarn test:coverage`

Runs the test coverage and reports the coverage per each file.

### `GIT_COMMAND="git checkout dev" yarn git:switch_branch`

Useful for switching quickly between branches for doing QA.

- Fetches new branches
- Stashes your changes
- Checks out new branch
- Pulls newest version of said branch
- Pops your stashed changes

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### `yarn sync`

Use this script when you are making edits to the `backends` directory. It will sync the files with the `amplify` directory. This way you can run all the `amplify *` commands and see updates when running `amplify status` while keeping the code base up to date.

## Set Up AWS Lambda function for AppSync resolver pipeline from AWS UI

The below step was done using this url from AWS doc(https://aws.amazon.com/blogs/mobile/appsync-custom-auth/).

- Open AWS IAM Roles(https://console.aws.amazon.com/iam/home?region=us-west-2#/roles) and use “Create role” button
- Select “Lambda” in Choose a use case press “Next: Permissions”.
- Filter and Select “AWSLambdaBasicExecutionRole” in Policies.
- Can skip the tags part.
- Set Role name and description.
- Create Role.
  Open AWS Lambda(https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions) and use “Create function” button
- Select “Author from scratch”.
- Set function name.
  - Select the latest version of Node.js in “Runtime” dropdown.
- Open “Change default execution role” content.
- Select “Use an existing role” option.
- Select the Role that has been added in above in the “Existing role” dropdown.
- Create Function.

## Edit newly created function.

- Go to index.js and add the function logic there
- ```javascript
  exports.handler = async (event) => {
    console.log('\nEvent\n', event); // with console log you will see logs in the Monitor log part.
    // Put main logic here.
    // Return statement can be an object with parameters or true/false statement.
  };
  ```
- You can add a test and for that there is a “Test” button. It can be specific for one of the AWS functions (AppSync, Cognito, etc.) or you can create custom.
  - The test function that you will create for AWS functions will contain the sample json body.
- Link Lambda function to GraphQL reservoir.
  - Go to AWS AppSync APIs(https://us-west-2.console.aws.amazon.com/appsync/home?region=us-west-2#/apis).
  - Edit the wanted API.
  - Go to the “Data Sources” Menu and use “Create data sources”.
  - Set data source name.
  - For data source type select “AWS Lambda function”.
  - Select Region for your data source.
  - Select the Function that you have created.
  - Use “Existing role” radio button and select the new role that has been at the start.
  - Go to the “Schema” Menu.
  - In the right part filter for the Query and edit which one you want to add lambda function.
  - In the Edit resolver under the Data source there is “Convert to pipeline resolver” click it and after popup will come push convert.
  - In the pipeline part add a Data source that is linked to Lambda function.
  - We must modify the default request mapping template since we need to access the whole context object, below is the code.
  ```json
      {
        "operation": "Invoke",
        "payload": $util.toJson($context)
      }
  ```
  - Order the functions in which order you want them to be triggered.

## Set Up AWS Cognito User Pool groups and AWS directives for User Group check from UI

- Go to the AWS Cognito (https://us-west-2.console.aws.amazon.com/cognito/home?region=us-west-2)
- Use "Manage User Pools" button.
- Select the User Pool for which groups needed to be added.
- Go to the "Users and groups" menu point.
- Go to the "Groups" tab.
- Use "Create Group" button.
- Set the group name.
- Description is optional.
- Select "IAM role" from existing or created one from IAM role(for creating role it will be after linking directive to GraphQL).
- Edit created role and "Add users" to the group.
- Go to the AWS AppSync (https://us-west-2.console.aws.amazon.com/appsync/home?region=us-west-2#/apis) and select the API.
- Go to the “Schema” Menu.
- In schema part go to the function that need to be checked for User group.
- Add this function "@aws_auth(cognito_groups: ["Admin", "Consultant"])" after the needed function.
- Save the schema by "Ctrl+s" and will work (will check how to add it from CLI).

- Create Police and Role for Cognito User Pool groups.

  - Go to AWS Policies (https://console.aws.amazon.com/iam/home?region=us-west-2#/policies).
  - Use "Create police" to create new police.
  - Extend "Service" and select "AppSync" from suggested options.
  - Now there will be "Actions" to select.
    - From "List" select.
      - ListDataSources
    - From "Read" select.
      - GetDataSource
      - GetGraphqlApi
      - GetResolver
    - From "Write" select.
      - GraphQL.
  - In Resources part "Add ARN".
    - Set your Data source region (ex. us-west-2).
    - For "Account" select "Any" checkbox.
    - For "GraphQL API id" use AppSync API id for which the police wil be used (ex. rnl6jk5mm5efvoyorssdr3dpuq).
  - If you need any condition for this police you need to specify them now skip them.
  - -> "Next: \*\*\*"
  - Skip tags.
  - -> "Next: \*\*\*"
  - Set Police Name and Description.
  - -> "Create police".
  - The police has been created remember the name it will needed to link police to role.

  - Go To AWS Roles (https://console.aws.amazon.com/iam/home?region=us-west-2#/roles)
  - Use "Create role" to create new role.
  - Select type of trusted entity: "Web Identity".
  - Identity provider: "Amazon Cognito".
  - Identity Pool ID: {your AWS Cognito User Pool ID}.
  - -> "Next: \*\*\*"
  - Select newly created police.
  - -> "Next: \*\*\*"
  - Skip tags.
  - -> "Next: \*\*\*"
  - Set Role Name and Description.
  - -> "Create role".

  - After this when you create the new Group in AWS Cognito User Pool you will be able to add this newly created role to Groups.

## Configure AWS Federated Identities to access S3 bucket.

(https://docs.amplify.aws/lib/storage/getting-started/q/platform/js/#using-amazon-s3)

1.  Open AWS IAM(Identity and Access Management).
2.  Go to Roles menu fined IAM that is connected to your "Federated Identity"
    (if you haven't created it yourself it should be Cognito\_{Federated_Identity_name}Auth_Role).
3.  Edit Role and check Permissions for S3 if it not there "Edit" Permissions and add below part to it and then save it.

```json
  "Statement": [
    ...
    {
        "Sid": "{name}",
        "Effect": "Allow",
        "Action": [
            "s3:GetObject",
            "s3:ListBucket"
        ],
        "Resource": [
            "arn:aws:s3:::{S3_Bucket_name}",
            "arn:aws:s3:::{S3_Bucket_name}/*"
        ]
    }
  ]
```

4.  Go to S3 Buckets and select the bucket that you need to connect to Cognito.
5.  Go to Bucket Permissions part and add below part to Bucket policy

```json
  {
    "Version": "2012-10-17",
    "Id": "Policy1610458465834",
    "Statement": [
        ...
        {
            "Sid": "DelegateS3Access",
            "Effect": "Allow",
            "Principal": {
                "AWS": "{Cognito_Role_ARN}"
            },
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::{Bucket_name}/*",
                "arn:aws:s3:::{Bucket_name}"
            ]
        }
    ]
  }
```

6.  Scroll down to CORS(Cross-origin resource sharing) and add below part for accessing from localhost or other url.

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": [
      "x-amz-server-side-encryption",
      "x-amz-request-id",
      "x-amz-id-2",
      "ETag"
    ],
    "MaxAgeSeconds": 3000
  }
]
```
