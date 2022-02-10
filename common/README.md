
# Lambda Functions

[Lambda and Layer Notes](https://docs.google.com/document/d/1W6kx4tL_bD783Q_dk2UpE0u-kYv5eXrdOLDyRi-lpJ8/)

Lambda functions can be deployed directly, or through SAM (serverless application model) stacks.
These functions are often set to trigger based on events in the cloud, such as incoming files in s3 buckets.

## Environment preparation

Install a virtual environment:

```bash
python3 -m venv --clear venv
. venv/bin/activate
pip install -r venv_requirements.txt
```

If you add a venv package, please update the requirements doc by running the
following command:

```bash
pip freeze > venv_requirements.txt
```

NOTE: Please also add the requirement to the [lambda_function]/requirements.txt doc if the package is used by the code running in the lambda function.


## Deploy new code

Set respective ENV variable {dev,test,prod} and run the script from the lambda function root directory:

```bash
./deploy_lambda_function.sh -e test
```

This also deploys respective trigger for any new arriving files. The triggers
could also be part of the template.yaml as described [here](http://www.michalsakowicz.com/2018/04/07/aws-lambda-how-to-add-s3-trigger-using-command-line.html) but that results in a blown up deployment package which slows down development. 

**TODO(e):** We should probably invest some time to figure out how to generate a less blown up solution for the lambda trigger generation so that deleting the stack will cleanly remove all dependencies.

If you change the template you might have to delete the stack and re-deploy it in order for new roles to take effect. To delete the current stack run

```bash
aws --profile neatleaf-dev cloudformation delete-stack --region us-west-2 --stack-name "PestDetectorThreshold${ENV^}SAMStack"

aws --profile neatleaf-dev cloudformation delete-stack --region us-west-2 --stack-name "PestDetectorThresholdTestSAMStack"
```

To see the current bucket configuration run

```bash
aws --profile neatleaf --region us-west-2 s3api get-bucket-notification-configuration --bucket "neatleaf-$ENV-sensordata01-us-west-2"

aws --profile neatleaf --region us-west-2 s3api get-bucket-notification-configuration --bucket "neatleaf-test-sensordata01-us-west-2"
```


## Testing

To run the unit tests run:
```bash
PYTHONPATH=data_proto_processing python3 -m pytest -s -vv data_proto_processing_test.py
```

You can specify to run only a single test by adding the following flag:
```bash
PYTHONPATH=data_proto_processing python3 -m pytest -s -vv data_proto_processing_test.py -k 'test_lambda_handler_no_light'
```

To test the lambda function before deploying, run the following command with a properly formatted test script:
```bash
sam local invoke PestDetectorThresholdFunction -e ./data/event_test.json
```

Or the following command on an event template script, with ${ENV} variables in s3 pathnames.  Environment and profile must be also set.
```bash
ENV='test'
PROFILE='neatleaf-dev'

EVENT_DATA=$(sed -e "s/\${ENV}/${ENV}/" ./data/event.json)
echo $EVENT_DATA | sam local invoke PestDetectorThresholdFunction  --profile $PROFILE --event -
```

The local sam invoke tests are automatically run when deploying functions, but can also be ran manually for development purposes.

# Layers

Common functionality that is shared between functions can be packaged in a lambda layer.

These still count toward the unzipped lambda file size, but help with keeping shared code organized across deployments.

[Lambda and Layer Notes](https://docs.google.com/document/d/1W6kx4tL_bD783Q_dk2UpE0u-kYv5eXrdOLDyRi-lpJ8/)


# Helpful commands and references

Convert a json into a yaml and vice-versa:

```bash
cat input.json | cfn-flip
cfn-flip input.json output.yaml
cfn-flip input.yaml output.json
```

[AWS cli output query filters.](https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-output.html#cli-usage-output-filter)

Listing and deleting stacks, examples:

```bash
aws --profile neatleaf cloudformation describe-stacks --region us-west-2 --stack-name DataProtoProcessingTestSAMStack
aws cloudformation list-stacks --region us-west-2
aws --profile neatleaf cloudformation list-stacks --region us-west-2 --stack-status-filter UPDATE_ROLLBACK_FAILED
aws --profile neatleaf cloudformation delete-stack --region us-west-2 --stack-name "DataProtoProcessing${ENV^}SAMStack"
```

Selectively copying data in S3, example:

```bash
aws --profile neatleaf s3 sync --dryrun s3://sensordata01-us-west-2/ s3://neatleaf-dev-sensordata01-us-west-2/upload/ --exclude "*" --include "archive/sparrow:b827eba4c37d:hw-01:sw-0-0-8_2020-09-1*"
```
This command wouldn't actually copy data, since the `--dryrun` flag is specified.  To move the data, remove the dryrun flag.

Linting according to Google style guide:

```bash
yapf -i --style=google data_proto_processing_test.py
```

