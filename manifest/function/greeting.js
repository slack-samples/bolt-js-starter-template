const { DefineFunction, Schema } = require("@slack/bolt");

const GreetingFunctionDefinition = DefineFunction({
  callback_id: "greeting_function",
  title: "Send a greeting",
  description: "Send greeting to channel",
  source_file: "functions/greeting_function.ts",
  input_parameters: {
    properties: {
      recipient: {
        type: Schema.slack.types.user_id,
        description: "Greeting recipient",
      },
      message: {
        type: Schema.types.string,
        description: "Message to the recipient",
      },
    },
    required: ["message"],
  },
  output_parameters: {
    properties: {
      greeting: {
        type: Schema.types.string,
        description: "Greeting for the recipient",
      },
    },
    required: ["greeting"],
  },
});

export default GreetingFunctionDefinition;