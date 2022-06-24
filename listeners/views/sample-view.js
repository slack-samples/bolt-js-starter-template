/*
   Learn how to:
   -> update and push views with Bolt:  https://slack.dev/bolt-js/concepts#updating-pushing-views
   -> listen to views with Bolt: https://slack.dev/bolt-js/concepts#view-submissions
   For more information about views: https://api.slack.com/reference/surfaces/views
*/

const sampleViewCallback = async ({ ack, view, body, client }) => {
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
