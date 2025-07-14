const { expect } = require('chai');
const sinon = require('sinon');
const { sampleShortcutCallback } = require('../../listeners/shortcuts/sample-shortcut');

describe('shortcuts', () => {
  let fakeShortcut;
  let fakeAck;
  let fakeClient;
  let fakeLogger;

  beforeEach(() => {
    fakeShortcut = {
      trigger_id: 't1234',
    };
    fakeAck = sinon.stub();
    fakeClient = {
      views: {
        open: sinon.stub(),
      },
    };
    fakeLogger = {
      error: sinon.stub(),
    };
  });

  it('should acknowledge and open modal view', async () => {
    await sampleShortcutCallback({
      shortcut: fakeShortcut,
      ack: fakeAck,
      client: fakeClient,
      logger: fakeLogger,
    });

    expect(fakeAck.calledOnce).to.be.true;
    expect(fakeClient.views.open.calledOnce).to.be.true;

    const callArgs = fakeClient.views.open.getCall(0).args[0];
    expect(callArgs.trigger_id).to.equal(fakeShortcut.trigger_id);
    expect(callArgs.view).to.not.be.null;
  });

  it('should log error when ack throws exception', async () => {
    const testError = new Error('test exception');
    fakeAck.rejects(testError);

    await sampleShortcutCallback({
      shortcut: fakeShortcut,
      ack: fakeAck,
      client: fakeClient,
      logger: fakeLogger,
    });

    expect(fakeClient.views.open.called).to.be.false;
    expect(fakeAck.calledOnce).to.be.true;
    expect(fakeLogger.error.calledWith(testError)).to.be.true;
  });
});
