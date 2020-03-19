#!/bin/bash
script_dir=$(cd $(dirname $0); pwd)
cd $script_dir
npx browserify -t sheetify ${script_dir}/src/index.js > ${script_dir}/html/bundle.js
