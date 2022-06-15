const sampleCommandCallback = async ({ ack, respond }) => {
  // For more information about commands: https://slack.dev/bolt-js/concepts#commands
  try {
    await ack();
    await respond('Responding to the sample command!');
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sampleCommandCallback };
