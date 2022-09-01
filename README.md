# Bolt for JavaScript Template App

This is a Slack app template that uses Bolt for Javascript. It is compatible with next-generation Slack Platform tools and features (currently in beta)
* [Slack CLI](https://api.slack.com/future/overview)
* [Slack Function](), [Workflows](), and [Triggers]()

Before getting started, make sure you have a development workspace where you have permissions to install apps. If you don’t have one set up, go ahead and
[create one](https://slack.com/create). 

**beta** [Accept the Slack Platform Beta Terms of Service](https://slack.com/admin/settings#hermes_permissions) (ToS) on your development workspace

## Setup
#### Prerequisites
* A recent version of [node](https://nodejs.org/en/)
  * With nvm: `nvm install node && nvm alias default node`
  * With brew: `brew install node`
* Install the [Slack Command Line Tool](https://api.slack.com/future/quickstart)
  * Install from command line: `$ curl -fsSL https://downloads.slack-edge.com/slack-cli/install.sh | bash`
  * Login with the CLI to your Slack workspace: `slack login`. Follow the instructions in terminal to complete authorization.

### 

```zsh
# Clone this project onto your machine
$ slack create my-app -t slack-samples/bolt-js-starter-template -b future

# Change into this project directory
$ cd my-app

# Install dependencies
# The CLI will attempt to install dependencies on create but you can also run 
$ npm install

# Run app locally
$ slack run

```
#### Local run

While building your app, see your changes propagated to your workspace in real-time with `slack run`.

`slack run` creates and installs your app to your workspace, ands starts it in development mode (a.k.a SocketMode).

You'll know your app is running locally when you see the following:

```zsh
$ slack run
...
Updating dev app install for workspace <Workspace Name>
Preparing local run in developer mode (Socket Mode)
/path/to/your/app/app.js
[DEBUG]  bolt-app initialized
⚡️ Bolt app is running! ⚡️
```

When you want to stop your app, use `Ctrl+c` in the command prompt.


### Try the app out

```zsh
# Create your trigger
$ slack triggers create --trigger-def="triggers/hello-world-trigger.json"

⚡ Trigger created
  Trigger ID:   [ID for trigger]
  Trigger Type: [type of rigger]
  Trigger Name: [name of trigger]
  URL:  [some URL]
```

Paste the URL into a public channel in your development workspace and try running the workflow!


***
## Project Structure

### `app.js`

`app.js` is the entry point for your application and is the file you run to start the server. This project aims to keep this file as thin as possible, primarily using it as a way to route inbound requests from Slack.

### `/listeners`

Each incoming request is routed to a "listener" you define. Inside this directory, see listeners grouped based on the Slack Platform feature used. 

In this project, our `/listeners` directory contains a `/functions` directory which contains a simple example of a Slack Function. 
  * `./functions/hello-world.js`: Configuration for posting a greeting message to the desired channel once it has been submitted through the form modal. [^1] 

### `/manifest`[^1]

Declare your app's configuration in code. Make your changes here, and we'll update your app manifest with Slack when you `slack run`. 

### `/triggers`[^1]

Declare a trigger for any workflows published by our app


<!--
#### Deploying your app
Please refer to our deployment guide for next-generation Slack apps [here](https://slack.dev/bolt-js/future/deploy-your-app).

#### Resources
To learn more about developing with Bolt for JS and the CLI, you can visit the following guides:

* [Creating a new app with the CLI]()
* [Configuring your app]()
* [Developing locally]()
* [Deployment](https://slack.dev/bolt-js/future/deploy-your-app)
 -->

[^1]: These parts of the app are beta features. See [api.slack.com/future](https://api.slack.com/future) for more information
