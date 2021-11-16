const sampleCommandCallback = async ({ command, ack, client, respond }) => {
  try {    
    await ack();
    await respond('Responding to the sample command!');
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sampleCommandCallback };
