const { Manifest } = require('@slack/bolt');
const { GreetingWorkflow } = require('./workflow/greeting');

module.exports = Manifest({
  runOnSlack: false,
  name: 'Bolt Template App',
  displayName: 'Bolt Template App',
  description: 'A starter app template built with Bolt JS',
  botScopes: ['channels:history', 'chat:write', 'commands', 'chat:write.public'],
  socketModeEnabled: true,
  workflows: [GreetingWorkflow],
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
  eventSubscriptions: { bot_events: ['app_home_opened', 'message.channels'] },
  tokenRotationEnabled: false,
});
