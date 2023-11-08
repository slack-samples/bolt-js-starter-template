const { sampleFunctionCallback } = require('./sample-function');

module.exports.register = (app) => {
  app.function('sample_function', sampleFunctionCallback);
};
