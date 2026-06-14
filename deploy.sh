#!/usr/bin/env bash
set -euo pipefail

yarn build
rsync -avz --delete dist/ bwg:~/www/carbonyl.io/
