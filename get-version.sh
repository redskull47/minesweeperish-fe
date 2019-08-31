#!/usr/bin/env bash

GIT_VERSION=`git rev-parse HEAD`
echo $GIT_VERSION

sed -i "s/.*REACT_APP_GIT_SHA.*/REACT_APP_GIT_SHA='$GIT_VERSION'/g" .env

