const { helloWorldFunc } = require('./hello-world');

// Register a complete function
module.exports.register = (app) => {
  app.function(helloWorldFunc);
  // Register another function here
};
