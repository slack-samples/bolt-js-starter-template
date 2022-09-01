const { Manifest } = require('@slack/bolt');
const { SampleWorkflow } = require('./workflow/sample-workflow');

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
module.exports = Manifest({
  runOnSlack: false,
  name: 'Bolt Template App TEST',
  displayName: 'Bolt Template App TEST',
  description: 'A starter app template built with Bolt JS',
  botScopes: ['channels:history', 'chat:write', 'commands', 'chat:write.public'],
  eventSubscriptions: { bot_events: ['app_home_opened', 'message.channels'] },
  socketModeEnabled: true,
  workflows: [SampleWorkflow],
  features: {
    appHome: {
      homeTabEnabled: true,
      messagesTabEnabled: false,
      messagesTabReadOnlyEnabled: true,
    },
    botUser: {
      always_online: false,
    },
    shortcuts: [{
      name: 'Run sample shortcut',
      type: 'global',
      callback_id: 'sample_shortcut_id',
      description: 'Runs a sample shortcut',
    }],
    slashCommands: [{
      command: '/sample-command',
      description: 'Runs a sample command',
      should_escape: false,
    }],
  },
  settings: {
    interactivity: {
      is_enabled: true,
    },
    org_deploy_enabled: false,
  },
});
