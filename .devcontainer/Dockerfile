# Use the Ubtuntu base image
FROM mcr.microsoft.com/devcontainers/javascript-node:24-trixie

# Download development tools
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y git
RUN apt-get install -y unzip

# Run the container as a user
RUN useradd -m -s /bin/bash slackdev
RUN chown slackdev /usr/local/bin
USER slackdev

# Set the working directory
WORKDIR /workspaces

# Install the Slack CLI
RUN curl -fsSL https://downloads.slack-edge.com/slack-cli/install.sh | bash
