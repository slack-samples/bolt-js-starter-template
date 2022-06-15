const sampleMessageCallback = async ({ context, say }) => {
  // For more information about listening messages: https://slack.dev/bolt-js/concepts#message-listening
  // For more information about sending messages: https://slack.dev/bolt-js/concepts#message-sending
  try {
    const greeting = context.matches[0];
    await say(`${greeting}, how are you?`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sampleMessageCallback };
