const sampleFunctionCallback = async ({ inputs, complete, fail }) => {
  try {
    const { sample_input } = inputs;
    complete({ outputs: { sample_output: sample_input } });
  } catch (error) {
    console.error(error);
    fail({ error });
  }
};

module.exports = { sampleFunctionCallback };
