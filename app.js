const { App } = require('@slack/bolt');
const { ConsoleLogger, LogLevel } = require('@slack/logger');
const { config } = require('dotenv');
const { registerListeners } = require('./listeners');

config();

/** Initialization */
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  logLevel: LogLevel.DEBUG,
});

/** Register Listeners */
registerListeners(app);

/** Start the Bolt App */
(async () => {
  const logger = new ConsoleLogger();
  logger.setLevel(LogLevel.DEBUG);
  try {
    await app.start();
    logger.info('⚡️ Bolt app is running!');
  } catch (error) {
    logger.error('Failed to start the app', error);
  }
})();
