#!/bin/bash

if [ -z "$STAGE" ]; then
    echo "Error: STAGE not set. Set STAGE example: export STAGE=dev"
    exit 1
fi

sed -i 's/STAGE/'$STAGE'/g' build/info.json
sed -i 's/COMMIT_ID/'$BITBUCKET_COMMIT'/g' build/info.json
sed -i 's/COMMIT_ID/'$BITBUCKET_COMMIT'/g' build/info.html 
USER_POOL_ID_RAW=$(cat src/shared/config/config-$STAGE.ts | grep "aws_user_pools_id")
USER_POOL_ID=${USER_POOL_ID_RAW:22:-2} 
sed -i 's/USER_POOL_ID/'$USER_POOL_ID'/g' build/info.json 
AWS_USER_POOLS_WEB_CLIENT_ID_RAW=$(cat src/shared/config/config-$STAGE.ts | grep "aws_user_pools_web_client_id")
AWS_USER_POOLS_WEB_CLIENT_ID=${AWS_USER_POOLS_WEB_CLIENT_ID_RAW:33:-2} 
sed -i 's/AWS_USER_POOLS_WEB_CLIENT_ID/'$AWS_USER_POOLS_WEB_CLIENT_ID'/g' build/info.json 

cat "build/info.html"
cat "build/info.json"