#!/usr/bin/env bash
set -e

echo "Activating Slack CLI installation feature..."

# Download the official install script and run it
curl -fsSL https://downloads.slack-edge.com/slack-cli/install.sh | bash

# The script usually installs to a specific directory.
# We need to ensure it is in the system PATH for all users.
ln -s /usr/local/bin/slack /usr/bin/slack

echo "Slack CLI installed successfully!"
