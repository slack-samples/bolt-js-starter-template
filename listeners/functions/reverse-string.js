// For more information about functions: https://api.slack.com/future/functions

const reverseString = async ({ event, success, error }) => {
  const { stringToReverse } = event.inputs;
  const reversed = stringToReverse.split('').reverse().join('');
  try {
    await success({ reverseString: reversed });
  } catch (err) {
    // call error callback with function outputs
    await error('There was an issue', err);
  }
};

module.exports = { reverseString };
