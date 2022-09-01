const { DefineFunction, Schema } = require('@slack/bolt');

const SampleFunctionDefinition = DefineFunction({
  callback_id: 'sample_function_id',
  title: 'Send a greeting',
  description: 'Send greeting to channel',
  source_file: 'functions/sample-function.ts',
  input_parameters: {
    properties: {
      recipient: {
        type: Schema.slack.types.user_id,
        description: 'Send greeting to this recipient',
      },
      channel: {
        type: Schema.slack.types.channel_id,
        description: 'Channel to send message to',
      },
      message: {
        type: Schema.types.string,
        description: 'Message to the recipient',
      },
    },
    required: ['message'],
  },
});

module.exports = { SampleFunctionDefinition };
