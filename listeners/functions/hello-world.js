// For more information about functions: https://api.slack.com/future/functions
const { SlackFunction } = require('@slack/bolt');

// Get our Approval Function from the manifest!
const { GreetingFunctionDefinition } = require('../../manifest/function/greeting');

// Here is the work we want to do!
const helloWorld = async ({ event, client, complete }) => {
  const { recipient, channel, message } = event.inputs;
  const salutations = ['Hello', 'Hi', 'Howdy', 'Hola', 'Salut'];
  const salutation = salutations[Math.floor(Math.random() * salutations.length)];
  try {
    await client.chat.postMessage({
      channel,
      text: `${salutation}, <@${recipient}>! :wave: Someone sent the following greeting: \n\n>${message}`,
    });
    complete();
  } catch (err) {
    // Complete function with an error
    await complete({ error: `There was an issue: ${err}` });
    throw (err);
  }
};

// Let's register a new Slack Function with helloWorld as its handler
const helloWorldFunc = new SlackFunction(GreetingFunctionDefinition.id, helloWorld);

module.exports = { helloWorldFunc };
