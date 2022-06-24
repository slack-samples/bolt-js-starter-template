/*
   Learn how to:
   -> listen messages with Bolt:  https://slack.dev/bolt-js/concepts#message-listening
   -> send messages with Bolt:  https://slack.dev/bolt-js/concepts#message-sending
   For more information about messages: https://api.slack.com/messaging
 */

const sampleMessageCallback = async ({ context, say }) => {
  try {
    const greeting = context.matches[0];
    await say(`${greeting}, how are you?`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sampleMessageCallback };
