const { expect } = require('chai');
const sinon = require('sinon');
const { sampleActionCallback } = require('../../listeners/actions/sample-action');

describe('actions', () => {
  let fakeAck;
  let fakeClient;
  let fakeBody;
  let fakeLogger;

  beforeEach(() => {
    fakeAck = sinon.stub();
    fakeClient = {
      views: {
        update: sinon.stub(),
      },
    };
    fakeBody = {
      view: {
        id: 'test_id',
        hash: '156772938.1827394',
      },
    };
    fakeLogger = {
      error: sinon.stub(),
    };
  });

  it('should acknowledge and update view', async () => {
    await sampleActionCallback({
      ack: fakeAck,
      client: fakeClient,
      body: fakeBody,
      logger: fakeLogger,
    });

    expect(fakeAck.calledOnce).to.be.true;
    expect(fakeClient.views.update.calledOnce).to.be.true;

    const callArgs = fakeClient.views.update.getCall(0).args[0];
    expect(callArgs.view_id).to.equal(fakeBody.view.id);
    expect(callArgs.hash).to.equal(fakeBody.view.hash);
    expect(callArgs.view).to.not.be.null;
  });

  it('should log error when ack throws exception', async () => {
    const testError = new Error('test exception');
    fakeAck.rejects(testError);

    await sampleActionCallback({
      ack: fakeAck,
      client: fakeClient,
      body: fakeBody,
      logger: fakeLogger,
    });

    expect(fakeAck.calledOnce).to.be.true;
    expect(fakeLogger.error.calledWith(testError)).to.be.true;
  });
});
