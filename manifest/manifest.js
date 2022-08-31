const { DefineFunction, DefineWorkflow, Manifest, Schema } = require('@slack/bolt');

// Define a function
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

// Functions 
const TestReverseWorkflow = DefineWorkflow({
  callback_id: 'test_reverse',
  title: 'Test Reverse Function',
  description: 'test the reverse function',
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
    },
    required: [],
  },
});

const formData = TestReverseWorkflow.addStep(Schema.slack.functions.OpenForm, {
  title: 'Reverse string form',
  submit_label: 'Submit form',
  description: 'Submit a string to reverse',
  interactivity: TestReverseWorkflow.inputs.interactivity,
  fields: {
    elements: [
      {
        name: 'stringInput',
        title: 'String input',
        type: Schema.types.string,
        is_required: true,
      },
      {
        name: 'channel',
        title: 'Post in',
        type: Schema.slack.types.channel_id,
        is_required: true,
      },
    ],
  },
});

const reverseStep = TestReverseWorkflow.addStep(ReverseFunction, {
  stringToReverse: formData.outputs.fields.stringInput,
});

TestReverseWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: formData.outputs.fields.channel,
  message: reverseStep.outputs.reverseString,
});

module.exports = Manifest({
  runOnSlack: false,
  name: 'Bolt Template App',
  displayName: 'Bolt Template App',
  description: 'A starter app template built with Bolt JS',
  longDescription: 'Sometimes fate is like a small sandstorm that keeps changing directions. You change direction but the sandstorm chases you. You turn again, but the storm adjusts. Over and over you play this out, like some ominous dance with death just before dawn. Why? Because this storm isn’t something that blew in from far away, something that has nothing to do with you. This storm is you.',
  botScopes: ['channels:history', 'chat:write', 'commands'],
  tokenManagementEnabled: true,
  socketModeEnabled: true,
  functions: [ReverseFunction],
  workflows: [TestReverseWorkflow],
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
