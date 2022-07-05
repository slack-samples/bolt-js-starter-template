const { DefineFunction, Manifest, Schema } = require('@slack/deno-slack-sdk'); // will be node module import

const ReverseFunction = DefineFunction({
  callback_id: 'reverse',
  title: 'Reverse',
  description: 'Takes a string and reverses it',
  source_file: 'functions/reverse.ts',
  input_parameters: {
    properties: {
      stringToReverse: {
        type: Schema.types.string,
        description: 'The string to reverse',
      },
    },
    required: ['stringToReverse'],
  },
  output_parameters: {
    properties: {
      reverseString: {
        type: Schema.types.string,
        description: 'The string in reverse',
      },
    },
    required: ['reverseString'],
  },
});

module.exports = Manifest({
  slackHosted: false,
  name: 'Bolt Template App',
  displayName: 'Bolt Template App',
  description: 'Reverse a string',
  longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget neque sed nibh efficitur fermentum et nec est. Pellentesque pulvinar leo purus, sit amet aliquam libero gravida vel. Vestibulum justo augue, elementum sit amet dignissim eget, porttitor id urna. Phasellus non nibh at tortor facilisis gravida et nec ex. Suspendisse potenti.',
  botScopes: ['channels:history', 'chat:write', 'commands'],
  functions: [ReverseFunction],

  features: {
    appHome: {
      home_tab_enabled: true,
      messages_tab_enabled: false,
      messages_tab_read_only_enabled: true,
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
  socketModeEnabled: true,
  tokenRotationEnabled: false,

});