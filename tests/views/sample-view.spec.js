const { expect } = require('chai');
const sinon = require('sinon');
const { sampleViewCallback } = require('../../listeners/views/sample-view');

describe('views', () => {
  let fakeAck;
  let fakeView;
  let fakeBody;
  let fakeClient;
  let fakeLogger;

  beforeEach(() => {
    fakeAck = sinon.stub();
    fakeView = {
      state: {
        values: {
          input_block_id: {
            sample_input_id: {
              value: 'test value',
            },
          },
          select_channel_block_id: {
            sample_dropdown_id: {
              selected_conversation: 'C1234',
            },
          },
        },
      },
    };
    fakeBody = {
      user: {
        id: 'U1234',
      },
    };
    fakeClient = {
      chat: {
        postMessage: sinon.stub(),
      }
    };
    fakeLogger = {
      error: sinon.stub(),
    };
  });

  it('should acknowledge and post message with form values', async () => {
    await sampleViewCallback({
      ack: fakeAck,
      view: fakeView,
      body: fakeBody,
      client: fakeClient,
      logger: fakeLogger,
    });

    expect(fakeAck.calledOnce).to.be.true;
    expect(fakeClient.chat.postMessage.calledOnce).to.be.true;

    const callArgs = fakeClient.chat.postMessage.getCall(0).args[0];
    expect(callArgs.channel).to.equal(fakeView.state.values.select_channel_block_id.sample_dropdown_id.selected_conversation);
    expect(callArgs.text).to.include(fakeView.state.values.input_block_id.sample_input_id.value);
    expect(callArgs.text).to.include(fakeBody.user.id);
  });

  it('should log error when ack throws exception', async () => {
    const testError = new Error('test exception');
    fakeAck.rejects(testError);

    await sampleViewCallback({
      ack: fakeAck,
      view: fakeView,
      body: fakeBody,
      client: fakeClient,
      logger: fakeLogger,
    });

    expect(fakeAck.calledOnce).to.be.true;
    expect(fakeLogger.error.calledWith(testError)).to.be.true;
  });
});
