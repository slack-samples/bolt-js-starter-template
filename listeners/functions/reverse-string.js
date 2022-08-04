// For more information about functions: https://api.slack.com/future/functions

const reverseString = async ({ event, completeSuccess, completeError }) => {
  const { stringToReverse } = event.inputs;
  const reversed = stringToReverse.split('').reverse().join('');
  try {
    await completeSuccess({ reverseString: reversed });
  } catch (err) {
    // call error callback with function outputs
    await completeError(`There was an issue: ${err}`);
  }
};

module.exports = { reverseString };
