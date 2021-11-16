const sampleViewCallback = async ({ ack, view, body, client }) => {
  
  await ack();
  
  try {
    const providedValues = view.state.values;
    console.log(providedValues);
    const sampleInputValue = providedValues.input_block_id.sample_input_id.value;
    const sampleConvoValue = providedValues.select_channel_block_id.sample_dropdown_id.selected_conversation;
    
    client.chat.postMessage({
      channel: sampleConvoValue,
      text: `<@${body.user.id}> submitted the following :sparkles: hopes and dreams :sparkles:: \n\n ${sampleInputValue}`,
    })
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sampleViewCallback };
