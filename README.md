# Bolt for JavaScript Template App

This is a generic Bolt for JavaScript template app used to build out Slack apps.

Before getting started, make sure you have a development workspace where you have permissions to install apps. If you don’t have one setup, go ahead and [create one](https://slack.com/create).
## Installation

#### Create a Slack App
1. Open [https://api.slack.com/apps/new](https://api.slack.com/apps/new) and choose "From an app manifest"
2. Choose the workspace you want to install the application to
3. Copy the contents of [manifest.json](./manifest.json) into the text box that says `*Paste your manifest code here*` (within the JSON tab) and click *Next*
4. Review the configuration and click *Create*
5. Click *Install to Workspace* and *Allow* on the screen that follows. You'll then be redirected to the App Configuration dashboard.

#### Environment Variables
Before you can run the app, you'll need to store some environment variables.

1. Copy `.env.sample` to `.env`
2. Open your apps configuration page from [this list](https://api.slack.com/apps), click *OAuth & Permissions* in the left hand menu, then copy the *Bot User OAuth Token* into your `.env` file under `SLACK_BOT_TOKEN`
3. Click *Basic Information* from the left hand menu and follow the steps in the *App-Level Tokens* section to create an app-level token with the `connections:write` scope. Copy that token into your `.env` as `SLACK_APP_TOKEN`.

#### Install Dependencies

`npm install`

#### Run Bolt Server

`npm start`

## Project Structure

### `manifest.json`

`manifest.json` is a configuration for Slack apps. With a manifest, you can create an app with a pre-defined configuration, or adjust the configuration of an existing app.

### `app.js`

`app.js` is the entry point for the application and is the file you'll run to start the server. This project aims to keep this file as thin as possible, primarily using it as a way to route inbound requests.

### `/listeners`

Every incoming request is routed to a "listener". Inside this directory, we group each listener based on the Slack Platform feature used, so `/listeners/shortcuts` handles incoming [Shortcuts](https://api.slack.com/interactivity/shortcuts) requests, `/listeners/views` handles [View submissions](https://api.slack.com/reference/interaction-payloads/views#view_submission) and so on.


## App Distribution / OAuth

Only implement OAuth if you plan to distribute your application across multiple workspaces. A separate `app-oauth.js` file can be found with relevant OAuth settings.

When using OAuth, Slack requires a public URL where it can send requests. In this template app, we've used [`ngrok`](https://ngrok.com/download). Checkout [this guide](https://ngrok.com/docs#getting-started-expose) for setting it up.

Start `ngrok` to access the app on an external network and create a redirect URL for OAuth. 

```
ngrok http 3000
```

This output should include a forwarding address for `http` and `https` (we'll use `https`). It should look something like the following:

```
Forwarding   https://3cb89939.ngrok.io -> http://localhost:3000
```

Navigate to **OAuth & Permissions** in your app configuration and click **Add a Redirect URL**. The redirect URL should be set to your `ngrok` forwarding address with the `slack/oauth_redirect` path appended. For example:

```
https://3cb89939.ngrok.io/slack/oauth_redirect
```




/////////////
/////////////
/////////////
# Bolt for JavaScript Template App

This is a Slack app template that uses Bolt for Javascript. It is alo compatible with next-generation Slack Platform tools and features
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