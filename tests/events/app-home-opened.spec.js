const { expect } = require('chai');
const sinon = require('sinon');
const { appHomeOpenedCallback } = require('../../listeners/events/app-home-opened');

describe('events', () => {
  let fakeClient;
  let fakeEvent;
  let fakeLogger;

  beforeEach(() => {
    fakeClient = {
      views: {
        publish: sinon.stub(),
      },
    };
    fakeEvent = {
      tab: 'home',
      user: 'U123',
    };
    fakeLogger = {
      error: sinon.stub(),
    };
  });

  it('should publish home view when tab is home', async () => {
    await appHomeOpenedCallback({
      client: fakeClient,
      event: fakeEvent,
      logger: fakeLogger,
    });

    expect(fakeClient.views.publish.calledOnce).to.be.true;

    const callArgs = fakeClient.views.publish.getCall(0).args[0];
    expect(callArgs.user_id).to.equal(fakeEvent.user);
    expect(callArgs.view).to.not.be.null;
  });

  it('should not publish when event tab is not home', async () => {
    fakeEvent.tab = 'about';

    await appHomeOpenedCallback({
      client: fakeClient,
      event: fakeEvent,
      logger: fakeLogger,
    });

    expect(fakeClient.views.publish.called).to.be.false;
  });

  it('should log error when views publish throws exception', async () => {
    const testError = new Error('test exception');
    fakeClient.views.publish.rejects(testError);

    await appHomeOpenedCallback({
      client: fakeClient,
      event: fakeEvent,
      logger: fakeLogger,
    });

    expect(fakeClient.views.publish.calledOnce).to.be.true;
    expect(fakeLogger.error.calledWith(testError)).to.be.true;
  });
});
