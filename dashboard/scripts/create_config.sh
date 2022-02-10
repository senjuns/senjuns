#!/bin/bash

if [ -z "$STAGE" ]; then
    echo "Error: STAGE not set. Set STAGE example: export STAGE=dev"
    exit 1
fi

DASHBOARD_INFO_URL="https://dashboard-info.$STAGE.neatleaf.com"

RESPONSE=$(curl -sS $DASHBOARD_INFO_URL)

exit_status=$?
if [ $exit_status != 0 ]
  then
    echo "Curl $DASHBOARD_INFO_URL failed so no proceeding!"
    exit $exit_status
fi

USER_POOL_ID=$(echo $RESPONSE | jq -r '.cognito_user_pool')
USER_POOL_WEB_CLIENT=$(echo $RESPONSE | jq -r '.login_client_id')
COGNITO_DASHBOARD_APP_USER_POOL_IDENTITY_POOL_ID=$(echo $RESPONSE | jq -r '.identity_pool_id')
COGNITO_POOL_ADDRESS=$(echo $RESPONSE | jq -r '.cognito_pool_address')

CONFIG_FILE_PREFIX="src/shared/config/config"
CONFIG_FILE="$CONFIG_FILE_PREFIX-$STAGE.ts"
CONFIG_FILE_REPLACED="$CONFIG_FILE_PREFIX.ts"
rm -f $CONFIG_FILE_REPLACED
cp $CONFIG_FILE $CONFIG_FILE_REPLACED

sed -i'.bak' "s/'USER_POOL_ID'/'$USER_POOL_ID'/g" $CONFIG_FILE_REPLACED
sed -i'.bak' 's/USER_POOL_WEB_CLIENT/'$USER_POOL_WEB_CLIENT'/g' $CONFIG_FILE_REPLACED
sed -i'.bak' 's/COGNITO_DASHBOARD_APP_USER_POOL_IDENTITY_POOL_ID/'$COGNITO_DASHBOARD_APP_USER_POOL_IDENTITY_POOL_ID'/g' $CONFIG_FILE_REPLACED

# Remove back up file created by sed.
rm $CONFIG_FILE_REPLACED'.bak'

cat $CONFIG_FILE_REPLACED