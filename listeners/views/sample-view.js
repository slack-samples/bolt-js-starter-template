const sampleViewCallback = async ({ ack, view, body, client }) => {
  // For more information about updating and pushing views views: https://slack.dev/bolt-js/concepts#updating-pushing-views
  // For more information about listening to views: https://slack.dev/bolt-js/concepts#view-submissions
  await ack();

  try {
    const formValues = view.state.values;
    const sampleInputValue = formValues.input_block_id.sample_input_id.value;
    const sampleConvoDropdown = formValues.select_channel_block_id.sample_dropdown_id;

    client.chat.postMessage({
      channel: sampleConvoDropdown.selected_conversation,
      text: `<@${body.user.id}> submitted the following :sparkles: hopes and dreams :sparkles:: \n\n ${sampleInputValue}`,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sampleViewCallback };
