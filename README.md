# Bolt for JavaScript Template App

This is a Slack app template that uses Bolt for Javascript. It is alo compatible with next-generation Slack Platform tools and features (currently in Beta)
* [Slack CLI](https://api.slack.com/future/overview)
* [Slack Function](), [Workflows](), and [Triggers]()


## Installation

#### Prerequisites
* [Slack Command Line Tool](https://api.slack.com/future/quickstart)- To use this template, you will need to have installed and configured the Slack CLI. 
Do this by following our [Quickstart Guide](https://api.slack.com/future/quickstart).
* Accept the Beta ToS

### Setup This Project

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
# Deploying a Bolt App via the Slack CLI is currently not supported

```
#### Running your app locally

While building your app, see your changes propagated to your 
workspace in real-time with `slack run`.

Executing `slack run` starts a local development server, syncing changes to 
your workspace's development version of your app. (You'll know it's the 
development version because the name has the string `(dev)` appended).

Your local development server is ready to go when you see the following:

```zsh
Connected, awaiting events
```

To turn off the local development server, use `Ctrl+c` in the command prompt.

## Project Structure

### `manifest.js`

`manifest.js` is a configuration for Slack CLI apps using Bolt for Javascript. This file contains all the basic configurations for your application, including app name and description. 

### `app.js`

`app.js` is the entry point for the application and is the file you'll run to start the server. This project aims to keep this file as thin as possible, primarily using it as a way to route inbound requests.

### `/listeners`

Every incoming request is routed to a "listener". Inside this directory, we group each listener based on the Slack Platform feature used, so `/listeners/functions` handles incoming [Slack Function](https://api.slack.com/future/functions/custom) requests, `/listeners/views` handlers [View submissions](https://api.slack.com/reference/interaction-payloads/views#view_submission) and so on.

### `/workflows`
The workflow initialization for Slack Functions are included with `/workflows/approval.js`. This includes adding different steps to your workflows to create a series of events (such as opening a modal or messaging someone)

### `/triggers`
All trigger configuration files live in here - for this example, `link-shortcut.json` is the trigger config for a trigger that starts the workflow initialized in `/workflows/approval.js`.



### Initialize your Workflow Trigger
To allow for a workflow to be called in a workspace, create a trigger through a JSON config file which can be found in `triggers/link-shortcut.json`. 

The contents of the file looks something like this:

```
{
  "type": "shortcut",
  "name": "Take Your Time",
  "description": "Submit a request to take time off",
  "workflow": "#/workflows/time_off_request_wf",
  "shortcut": {},
  "inputs": {
    "interactivity": {
      "value": "{{data.interactivity}}"
    }
  }
}
```

This file acts as a config for your trigger that specifies what shortcuts and/or workflows are linked to your trigger (in this case, it maps the workflow to the `approval_wf` callback ID from the Approval Workflow initialized in `workflows/approval.js`).

This file will also define how the trigger shows up in your application - for example, the `name` field will be the name of the trigger when it is surfaced in the Shortcut menu for your app in your workspace.

To create a trigger for your workflow, run the following command:
```
slack triggers create --trigger-def="triggers/link-shortcut.json"
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

### Adding new triggers

To add new triggers to your app, you’ll need to do the following:

1. Update the `manifest.js` with the desired workflow and/or functionality you’d like linked to your trigger
2. Run `slack run` so that any new additions to the `manifest.js` file will be detected within the `slack trigger` command.
3. Create a JSON file in the triggers directory to generate your trigger
4. Run `slack triggers create --trigger-def="triggers/[json-name].json"`