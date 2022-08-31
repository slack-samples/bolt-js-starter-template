# Bolt for JavaScript Template App

This is a Slack app template that uses Bolt for Javascript. It is alo compatible with next-generation Slack Platform tools and features (currently in Beta)
* [Slack CLI](https://api.slack.com/future/overview)
* [Slack Function](), [Workflows](), and [Triggers]()


#### Prerequisites
* [Slack Command Line Tool](https://api.slack.com/future/quickstart)- To use this template, you will need to have installed and configured the Slack CLI. 
Do this by following our [Quickstart Guide](https://api.slack.com/future/quickstart).
* Accept the Slack Platform Beta Terms of Service

### Setup Your Project

```zsh
# Clone this project onto your machine
slack create my-app -t slack-samples/bolt-js-starter-template -b future

# Change into this project directory
cd my-app

# Install dependencies
# The CLI will attempt to install dependencies for you but you can also run 
npm install

# Run app locally
slack run

# Deploy your app
# Slack currently doesn't support deployment of Bolt apps

```
#### Running your app locally

While building your app, see your changes propagated to your 
workspace in real-time with `slack run`.

Executing `slack run` starts a local development server, syncing changes to 
your workspace's development version of your app. (You'll know it's the 
development version because the name has the string `(dev)` appended).

Your local development server is ready to go when you see the following:

```zsh
Updating dev app install for workspace <Workspace Name>
Preparing local run in developer mode (Socket Mode)
/path/to/your/app/app.js
[DEBUG]  bolt-app initialized
⚡️ Bolt app is running! ⚡️
```

When you want to turn off the local development server, use `Ctrl+c` in the command prompt.

#### Deploying your app
Please refer to our deployment guide for next-generation Slack apps [here](https://slack.dev/bolt-js/future/deploy-your-app).

### Initialize your Workflow Trigger
To allow for a workflow to be called in a workspace, create a trigger through a JSON config file which can be found in `triggers/hello-world-trigger.json`. 

The contents of the file looks something like this:

```
{
  "type": "shortcut",
  "name": "Hello World",
  "description": "Start hello world flow",
  "workflow": "#/workflows/greeting_workflow",
  "shortcut": {},
  "inputs": {
    "interactivity": {
      "value": "{{data.interactivity}}",
      "hidden": true
    },
    "channel": {
      "value": "{{data.channel_id}}"
    }
  }
}
```

This file acts as a config for your trigger that specifies what shortcuts and/or workflows are linked to your trigger (in this case, it maps the workflow to the `reeting_workflow` callback ID from the Approval Workflow initialized in `manifest/workflow/greeting.js`).

This file will also define how the trigger shows up in your application - for example, the `name` field will be the name of the trigger when it is surfaced in the Shortcut menu for your app in your workspace.

To create a trigger for your workflow, run the following command:
```
slack triggers create --trigger-def="triggers/hello-world-trigger.json"
```

This trigger will produce a an output that looks like this:
```
⚡ Trigger created
     Trigger ID:   [ID for trigger]
     Trigger Type: [type of rigger]
     Trigger Name: [name of trigger]
     Shortcut URL:  [some URL]
```
To add the trigger to a channel for easy usage, you can add the link trigger URL as a channel bookmark.

#### Adding new triggers

To add new triggers to your app, you’ll need to do the following:

1. Update the `manifest.js` with the desired workflow and/or functionality you’d like linked to your trigger
2. Run `slack run` so that any new additions to the `manifest.js` file will be detected within the `slack trigger` command.
3. Create a JSON file in the triggers directory to generate your trigger
4. Run `slack triggers create --trigger-def="triggers/[json-name].json"`

## Project Structure

### `app.js`

`app.js` is the entry point for the application and is the file you'll run to start the server. This project aims to keep this file as thin as possible, primarily using it as a way to route inbound requests.

### `/listeners`

Every incoming request is routed to a "listener". Inside this directory, we group each listener based on the Slack Platform feature used. For this project, our `/listeners` directory contains a `/functions` directory which then holds related actions in an `/actions` directory that are triggered as handlers when a function is called triggered.

### `/listeners/functions/hello-world.js`

This file contains the configuration for posting a greeting message to the desired channel once it has been submitted through the form modal.

### `/manifest`

This directory contains all related initialization of the app as well as any workflows or functions used in the project. 

### `/manifest/manifest.js`

`manifest.js` is a configuration for Slack CLI apps using Bolt JS. This file will establish all basic configurations for your application, including app name and description. 

### `/manifest/workflow`

The workflow initialization for the Greeting Workflow can be found in `/manifest/workflow/greeting.js`. This includes adding different steps to your workflows to create a series of events (such as opening a modal or messaging someone)

### `/workflows`
The workflow initialization for Slack Functions are included with `/workflows/approval.js`. This includes adding different steps to your workflows to create a series of events (such as opening a modal or messaging someone)

### `/triggers`
All trigger configuration files live in here - for this example, `hello-world-trigger.json` is the trigger config for a trigger that starts the workflow initialized in `/manifest/workflow/greeting.js`.
