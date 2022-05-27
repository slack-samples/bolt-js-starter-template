#!/bin/bash

new_proj_dir="my-slack-app"
repo="https://github.com/slack-samples/bolt-js-starter-template/archive/main.zip"

if [ $# -gt 0 ]; then
  new_proj_dir=${1}
fi

mkdir -p "$new_proj_dir"

echo "\nDownloading the project template"
curl --show-error --location "$repo" | tar -xf - -C "$new_proj_dir" --strip-components=1
