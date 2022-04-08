const reverseString = async ({ event, client, success, error }) => {
  const { stringToReverse, channel_id } = event.inputs;
  const reversed = stringToReverse.split('').reverse().join('');
  try {
    await client.chat.postMessage({
      channel: channel_id,
      text: `You reversed ${stringToReverse} to ${reversed}`,
    });
    // call success callback with function outputs
    await success({ reverseString: reversed });
  } catch (err) {
    // call error callback with function outputs
    await error('There was an issue');
  }
};

module.exports = { reverseString };
