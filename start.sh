#!/usr/bin/env bash
BASEDIR=$(dirname "$0")
cd $BASEDIR
echo "Starting Infrared..."
pm2 start "PORT=7070 npm start" --name "Infrared"

