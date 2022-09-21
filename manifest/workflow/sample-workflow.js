const { DefineWorkflow, Schema } = require('@slack/bolt');
const { SampleFunctionDefinition } = require('../function/sample-function');

const SampleWorkflow = DefineWorkflow({
  callback_id: 'sample_workflow',
  title: 'Send a greeting',
  description: 'Send a greeting to channel',
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ['interactivity'],
  },
});

const inputForm = SampleWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: 'Send a greeting',
    interactivity: SampleWorkflow.inputs.interactivity,
    submit_label: 'Send greeting',
    fields: {
      elements: [{
        name: 'recipient',
        title: 'Recipient',
        type: Schema.slack.types.user_id,
      }, {
        name: 'channel',
        title: 'Channel to send message to',
        type: Schema.slack.types.channel_id,
        default: SampleWorkflow.inputs.channel,
      }, {
        name: 'message',
        title: 'Message to recipient',
        type: Schema.types.string,
      }],
      required: ['recipient', 'channel', 'message'],
    },
  },
);

const greetingFunctionStep = SampleWorkflow.addStep(
  SampleFunctionDefinition,
  {
    recipient: inputForm.outputs.fields.recipient,
    message: inputForm.outputs.fields.message,
  },
);

SampleWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: inputForm.outputs.fields.channel,
  message: greetingFunctionStep.outputs.greeting,
});

module.exports = { SampleWorkflow };
