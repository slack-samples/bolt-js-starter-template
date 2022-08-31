const { Manifest } = require('@slack/bolt');
const { GreetingWorkflow } = require('./workflow/greeting');


module.exports = Manifest({
  runOnSlack: false,
  name: 'Bolt Template App',
  displayName: 'Bolt Template App',
  description: 'A starter app template built with Bolt JS',
  longDescription: 'Sometimes fate is like a small sandstorm that keeps changing directions. You change direction but the sandstorm chases you. You turn again, but the storm adjusts. Over and over you play this out, like some ominous dance with death just before dawn. Why? Because this storm isn’t something that blew in from far away, something that has nothing to do with you. This storm is you.',
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
