#!/bin/sh
# Copyright (c) 2017 Aimirim STI.
set -e

# Check for backend address
if [ -z "${BACKEND_URL}" ]; then
    echo "ERROR: Could not find the variable 'BACKEND_URL'. Please set the Backend Adress."
    exit 127
fi
# Check for serve path
if [ -z "${ROOT_PATH}" ]; then
    ROOT_PATH=""
fi

build_path=/usr/share/nginx/html

# Update .json file with enviroment variables
cp -f $build_path/config.json.template $build_path/config.json
sed -i 's@BACKEND_URL@'"$BACKEND_URL"'@g' $build_path/config.json
sed -i 's@ROOT_PATH@'"$ROOT_PATH"'@g' $build_path/config.json

# Go to nginx 
nginx -g 'daemon off;'
