const { expect } = require('chai');
const sinon = require('sinon');
const { sampleCommandCallback } = require('../../listeners/commands/sample-command');

describe('commands', () => {
  let fakeAck;
  let fakeRespond;
  let fakeLogger;

  beforeEach(() => {
    fakeAck = sinon.stub();
    fakeRespond = sinon.stub();
    fakeLogger = {
      error: sinon.stub(),
    };
  });

  it('should acknowledge and respond to command', async () => {
    await sampleCommandCallback({
      ack: fakeAck,
      respond: fakeRespond,
      logger: fakeLogger,
    });

    expect(fakeAck.calledOnce).to.be.true;
    expect(fakeRespond.calledOnce).to.be.true;

    const callArgs = fakeRespond.getCall(0).args[0];
    expect(callArgs).to.include('Responding to the sample command!');
  });

  it('should log error when ack throws exception', async () => {
    const testError = new Error('test exception');
    fakeAck.rejects(testError);

    await sampleCommandCallback({
      ack: fakeAck,
      respond: fakeRespond,
      logger: fakeLogger,
    });

    expect(fakeAck.calledOnce).to.be.true;
    expect(fakeLogger.error.calledWith(testError)).to.be.true;
  });
});
