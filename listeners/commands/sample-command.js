/*
  Learn how to:
  -> use commands with Bolt:  https://slack.dev/bolt-js/concepts#commands
  For more information about slash commands: https://api.slack.com/interactivity/slash-commands
*/

const sampleCommandCallback = async ({ ack, respond }) => {
  try {
    await ack();
    await respond('Responding to the sample command!');
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sampleCommandCallback };
