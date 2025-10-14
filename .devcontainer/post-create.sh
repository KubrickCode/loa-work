#!/bin/bash

npm install -g @anthropic-ai/claude-code
npm install -g prettier
npm install -g baedal

if [ -f /workspaces/loa-work/.env ]; then
  grep -v '^#' /workspaces/loa-work/.env | sed 's/^/export /' >> ~/.bashrc
fi
