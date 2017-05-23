#!/bin/bash

for file in lib/js/examples/*.js; do
  node "$file"
done