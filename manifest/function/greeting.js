const { DefineFunction, Schema } = require('@slack/bolt');

const GreetingFunctionDefinition = DefineFunction({
  callback_id: 'greeting_function',
  title: 'Send a greeting',
  description: 'Send greeting to channel',
  source_file: 'functions/greeting_function.ts',
  input_parameters: {
    properties: {
      recipient: {
        type: Schema.slack.types.user_id,
        description: 'Greeting recipient',
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

module.exports = { GreetingFunctionDefinition };
