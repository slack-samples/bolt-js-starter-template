// For more information about functions: https://api.slack.com/future/functions
const { SlackFunction } = require('@slack/bolt');

// Get our Function Definition from the manifest!
const { SampleFunctionDefinition } = require('../../manifest/function/sample-function');

// Here is the work we want to do!
const helloWorld = async ({ event, complete }) => {
  const { recipient, message } = event.inputs;
  const salutations = ['Hello', 'Hi', 'Howdy', 'Hola', 'Salut'];
  const salutation = salutations[Math.floor(Math.random() * salutations.length)];
  try {
    const greeting = `${salutation}, <@${recipient}>! :wave: Someone sent the following greeting: \n\n>${message}`;
    return { outputs: { greeting } };
  } catch (err) {
    // Complete function with an error
    await complete({ error: `There was an issue: ${err}` });
    throw (err);
  }
};

// Let's create a new Slack Function with helloWorld as its handler
const helloWorldFunc = new SlackFunction(SampleFunctionDefinition.id, helloWorld);

module.exports = { helloWorldFunc };
