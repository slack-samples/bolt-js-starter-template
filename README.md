# Bolt for JavaScript Template App

This app contains a sample JavaScript project for use on Slack's
[next-generation hosted platform](https://api.slack.com/future). The project demonstrates how to use a [function](https://slack.dev/bolt-js/future/custom-functions), [workflow](https://slack.dev/bolt-js/future/workflows), and [trigger](https://slack.dev/bolt-js/future/triggers) to send a randomized greeting along with an inputted message. The message will tag a specified user and be sent to a channel of the requester's choice.


**Guide Outline**:

- [Supported Workflows](#supported-workflows)
- [Setup](#setup)
  - [Install the Slack CLI](#install-the-slack-cli)
  - [Clone the Sample App](#clone-the-sample-app)
- [Create a Link Trigger](#create-a-link-trigger)
- [Running Your Project Locally](#running-your-project-locally)
- [Deploying Your App](#deploying-your-app)
- [Project Structure](#project-structure)
- [Resources](#resources)

---

## Supported Workflows

- **Send a greeting**: Enter details in a form to send a randomized greeting along with an inputted message. The message will tag a specified user and be sent to a channel of the requester's choice.

## Setup
Before getting started, make sure you have a development workspace where you
have permissions to install apps. If you don’t have one set up, go ahead and
[create one](https://slack.com/create). Also, please note that the workspace
requires any of [the Slack paid plans](https://slack.com/pricing).

You will also need a recent version of [node](https://nodejs.org/en/). You can install it using either of the following methods:
  * With nvm: `nvm install node && nvm alias default node`
  * With brew: `brew install node`

**For Beta users:** Make sure that you also [accept the Slack Platform Beta Terms of Service](https://slack.com/admin/settings#hermes_permissions) (ToS) on your development workspace!


### Install the Slack CLI

To use this sample, you first need to install and configure the Slack CLI.
Step-by-step instructions can be found in our
[Quickstart Guide](https://api.slack.com/future/quickstart).

### Clone the Sample App

Start by cloning this repository:

```zsh
# Clone this project onto your machine
$ slack create my-app -t slack-samples/bolt-js-starter-template -b future

# Change into this project directory
$ cd my-app
```

## Create a Link Trigger

[Triggers](https://slack.dev/bolt-js/future/triggers) are what cause Workflows to
run. These Triggers can be invoked by a user, or automatically as a response to
an event within Slack.

A [Link Trigger](https://api.slack.com/future/triggers/link) is a type of
Trigger that generates a **Shortcut URL** which, when posted in a channel or
added as a bookmark, becomes a link. When clicked, the Link Trigger will run the
associated Workflow.

Link Triggers are _unique to each installed version of your app_. This means
that Shortcut URLs will be different across each workspace, as well as between
[locally run](#running-your-project-locally) and
[deployed apps](#deploying-your-app). When creating a Trigger, you must select
the Workspace that you'd like to create the Trigger in. Each Workspace has a
development version (denoted by `(dev)`), as well as a deployed version.

To create a Link Trigger for the "Send a Greeting" Workflow, run the following
command:

```zsh
$ slack trigger create --trigger-def="triggers/hello-world-trigger.json"
```

After selecting a Workspace, the output provided will include the Link Trigger
Shortcut URL. You can copy and paste this URL into a channel as a message to run the trigger. It will also be automatically added as a Bookmark in your channel.

**Note: this link won't run the Workflow until the app is either running locally
or deployed!** Read on to learn how to run your app locally and eventually
deploy it to Slack hosting.

## Running Your Project Locally

While building your app, you can see your changes propagated to your workspace
in real-time with `slack run`. In both the CLI and in Slack, you'll know an app
is the development version if the name has the string `(dev)` appended.

```zsh
$ slack run
...
Updating dev app install for workspace <Workspace Name>
Preparing local run in developer mode (Socket Mode)
/path/to/your/app/app.js
[DEBUG]  bolt-app initialized
⚡️ Bolt app is running! ⚡️
```

Once running, click the
[previously created Shortcut URL](#create-a-link-trigger) associated with the
`(dev)` version of your app. This should start a Workflow that opens a form used
to collect data around your greeting requests!

To stop running locally, press `<CTRL> + C` to end the process.

## Deploying Your App
As of right now, Bolt applications cannot be deployed to production using Run on Slack infrastructure. Stay tuned for further instructions on how to deploy your Bolt applications, coming soon! :sparkles:

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

## Resources
To learn more about developing with Bolt for JS and the CLI, you can visit the following guides:

* [Creating a new app with the CLI and developing locally](https://slack.dev/bolt-js/future/getting-started)
* [Configuring your app](https://slack.dev/bolt-js/future/app-manifests)


<!--
#### Deploying your app
Please refer to our deployment guide for next-generation Slack apps [here](https://slack.dev/bolt-js/future/deploy-your-app).

### Viewing Activity Logs
Activity logs for the production instance of your application can be viewed with
the `slack activity` command:

```zsh
$ slack activity
```
 -->

[^1]: These parts of the app are beta features. See [What is the next-generation platform?](https://slack.dev/bolt-js/future/getting-started#next-gen) and [api.slack.com/future](https://api.slack.com/future) for more information
