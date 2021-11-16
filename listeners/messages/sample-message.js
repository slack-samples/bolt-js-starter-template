const sampleMessageCallback = async ({ context, client, message, say }) => {
  try {
    const greeting = context.matches[0];
    await say(`${greeting}, how are you?`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sampleMessageCallback };
