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
      message: {
        type: Schema.types.string,
        description: 'Message to the recipient',
      },
    },
    required: ['message'],
  },
  output_parameters: {
    properties: {
      greeting: {
        type: Schema.types.string,
        description: 'Greeting for the recipient',
      },
    },
    required: ['greeting'],
  },
});

module.exports = { SampleFunctionDefinition };
