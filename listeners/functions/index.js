const { reverseString } = require('./reverse-string');

module.exports.register = (app) => {
  app.function('reverse', reverseString);
};
