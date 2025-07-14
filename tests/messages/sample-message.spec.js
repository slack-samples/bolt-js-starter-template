const { expect } = require('chai');
const sinon = require('sinon');
const { sampleMessageCallback } = require('../../listeners/messages/sample-message');

describe('messages', () => {
  let fakeContext;
  let fakeSay;
  let fakeLogger;

  beforeEach(() => {
    fakeContext = {
      matches: ['hello'],
    };
    fakeSay = sinon.stub();
    fakeLogger = {
      error: sinon.stub(),
    };
  });

  it('should call say with greeting response', async () => {
    await sampleMessageCallback({
      context: fakeContext,
      say: fakeSay,
      logger: fakeLogger,
    });

    expect(fakeSay.calledOnce).to.be.true;
    const callArgs = fakeSay.getCall(0).args[0];
    expect(callArgs).to.include(fakeContext.matches[0]);
    expect(callArgs).to.include('hello, how are you?');
  });

  it('should log error when say throws exception', async () => {
    const testError = new Error('test exception');
    fakeSay.rejects(testError);
    await sampleMessageCallback({
      context: fakeContext,
      say: fakeSay,
      logger: fakeLogger,
    });

    expect(fakeSay.calledOnce).to.be.true;
    expect(fakeLogger.error.calledWith(testError)).to.be.true;
  });
});
