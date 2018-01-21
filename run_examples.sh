#!/bin/bash

for file in examples/*.bs.js; do
  node "$file"
done
