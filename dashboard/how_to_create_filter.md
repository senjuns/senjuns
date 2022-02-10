# How to create filter resolvers

## Update Schema

- start sync - this will synchornize the amplify folder with the backend folder
  - ```bash
    yarn sync
    ```
- update schema.graphql
  - create filter input
  - use `input UpdateMeasurement_runInput` as a template
  - replace
    - Ints with IntFilterInput
    - String and misc with StringFilterInput
  - ```graphql
    """
    schema.graphql
    """
    input FilterMeasurement_runInput {
      id: IntFilterInput
      start_time: IntFilterInput
      end_time: IntFilterInput
      metadata: StringFilterInput
      config_id: IntFilterInput
      status_code_id: IntFilterInput
      system_id: IntFilterInput
    }
    ```
  - add filter query to `type Query` node
  - ```graphql
      """schema.graphql"""
      type Query {
          ...
          filterMeasurement_runs(filterMeasurement_runInput: FilterMeasurement_runInput!): [measurement_run]
          ...
      }
    ```
  - ```bash
      # update the AWS console
      amplify push
      # update API.ts based on the newly updated/pushed (to the AWS cloud) schema.graphql
      amplify codegen
    ```

## Generate custom resources

- ```bash
    cd neatleaf/databases/graphql/src/
    # create input directory (if it doesn't exist) for resolvers
    mkdir input
    cd input
    touch Query.filterMeasurement_runs.req.vtl
    touch Query.filterMeasurement_runs.res.vtl
  ```

### Request resolver

- make sure to set the values
  - table name
  - column names
  - time column names

```velocity
    ## Query.filterMeasurement_runs.req.vtl
    ## Set these values.
    #set ( $input = $ctx.args.filterMeasurement_runInput )
    #set ( $tableName = "spyder.measurement_run" )
    #set ( $columnList = ['id', 'system_id', 'status_code_id', 'config_id', 'metadata'] )
    #set ( $columnTimeList = ['start_time', 'end_time'] )

    ## Build columns to be selected.
    #foreach( $columnTime in $columnTimeList )
        #set ( $convertedTime = "cast(extract(epoch from $columnTime) as integer) as $columnTime" )
        #set ( $discard = $columnList.add($convertedTime) )
    #end
    #set ( $columns = $columnList.toString().replace("[", "").replace("]", "") )

    ## Build where condition.
    #set( $whereList = [] )
    #foreach( $key in $input.keySet() )
    #foreach( $op in $input[$key].keySet() )
        #set( $opEntry = $input[$key] )
        #set( $value = $opEntry[$op] )
        #set( $op_value = "" )
        #if( $columnTimeList.contains($key))
        #set( $key = "cast(extract(epoch from $key) as integer)" )
        #end
        #if( $op=="eq" )
        #set( $op_value = "$key = $value" )
        #elseif( $op=="neq" )
        #set( $op_value = "$key != $value" )
        #elseif( $op=="gt" )
        #set( $op_value = "$key > $value" )
        #elseif( $op=="ge" )
        #set( $op_value = "$key >= $value" )
        #elseif( $op=="lt" )
        #set( $op_value = "$key < $value" )
        #elseif( $op=="le" )
        set( $op_value = "$key <= $value" )
        #elseif( $op=="in" )
        #set( $op_value = "$key IN $value" )
        #elseif( $op=="between" )
        #set( $start = $value[0] )
        #set( $end = $value[1] )
        #set( $op_value = "( $start <= $key AND $key <= $end )" )
        #elseif( $op=="contains" )
        #set( $op_value = "$key LIKE '%$value%'" )
        #elseif( $op=="notContains" )
            #set( $op_value = "$key NOT LIKE '%$value%'" )
        #elseif( $op=="beginsWith" )
        #set( $op_value = "$key LIKE '$value%'" )
        #end
        #set( $discard = $whereList.add($op_value) )
    #end
    #end
    #set( $where = $whereList.toString().replace("[", "").replace("]", "").replace(",", " AND ") )

    {
        "version": "2018-05-29",
        "statements": ["SELECT $columns FROM $tableName WHERE $where"]
    }
```

### Response resolver

```velocity
    ## Query.filterMeasurement_runs.res.vtl
    ## Raise a GraphQL field error in case of a datasource invocation error
    #if($ctx.error)
        $utils.error($ctx.error.message, $ctx.error.type)
    #end

    $utils.toJson($utils.rds.toJsonObject($ctx.result)[0])
```

### Run custom resource generator

- ```bash
    cd neatleaf/databases/graphql/src
    # Create output file if it doesnt exist.
    mkdir output

    # Compile ts.
    npx tsc scripts/generate_custom_resources.ts

    # Run compiled ts.
    node scripts/generate_custom_resources.js --resolvers_uri input --copy_resolvers_uri /Users/joelau/Sites/neatleaf/dashboard/backends/amplify_test/backend/api/enmoApiTest/resolvers

    # You should see the output in the output dir.
    ls output
    > generatedCustomResources_0.json
  ```

- copy output contents to `neatleaf/dashboard/backends/amplify_test/backend/api/enmoApiTest/stacks/CustomResources.json`
- ```json
  ///CustomResources.json
  ...
  "Resources": {
      ...
      "FilterMeasurementRunsResolver": {
      "Type": "AWS::AppSync::Resolver",
      "Properties": {
        "ApiId": {
          "Ref": "AppSyncApiId"
        },
        "DataSourceName": "enmo_rds_DataSource",
        "FieldName": "filterMeasurement_runs",
        "TypeName": "Query",
        "RequestMappingTemplateS3Location": {
          "Fn::Sub": [
            "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/${ResolverFileName}",
            {
              "S3DeploymentBucket": {
                "Ref": "S3DeploymentBucket"
              },
              "S3DeploymentRootKey": {
                "Ref": "S3DeploymentRootKey"
              },
              "ResolverFileName": {
                "Fn::Join": [
                  ".",
                  [
                    "Query",
                    "filterMeasurement_runs",
                    "req",
                    "vtl"
                  ]
                ]
              }
            }
          ]
        },
        "ResponseMappingTemplateS3Location": {
          "Fn::Sub": [
            "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/${ResolverFileName}",
            {
              "S3DeploymentBucket": {
                "Ref": "S3DeploymentBucket"
              },
              "S3DeploymentRootKey": {
                "Ref": "S3DeploymentRootKey"
              },
              "ResolverFileName": {
                "Fn::Join": [
                  ".",
                  [
                    "Query",
                    "filterMeasurement_runs",
                    "res",
                    "vtl"
                  ]
                ]
              }
            }
          ]
        }
      }
    }
  }
  ```
- ```bash
  # update the AWS console
  amplify push
  # update API.ts based on the newly updated/pushed (to the AWS cloud) schema.graphql
  amplify codegen
  ```
