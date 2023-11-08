const actions = require('./actions');
const commands = require('./commands');
const events = require('./events');
const functions = require('./functions');
const messages = require('./messages');
const shortcuts = require('./shortcuts');
const views = require('./views');

module.exports.registerListeners = (app) => {
  actions.register(app);
  commands.register(app);
  events.register(app);
  functions.register(app);
  messages.register(app);
  shortcuts.register(app);
  views.register(app);
};
