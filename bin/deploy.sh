#!/bin/sh

cd "$( cd `dirname $0` && pwd )/.."

dir=$(pwd)

file="$dir/config/config.js"

if [ ! -f "$file" ] ; then
  cp $file.dist $file
fi

npm install

node_modules/grunt/bin/grunt build
