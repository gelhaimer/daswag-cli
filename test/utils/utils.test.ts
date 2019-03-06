import {expect} from 'chai';
import 'mocha';
import LoggerUtils from '../../src/utils/logger-utils';

describe('logger-utils', () => {
  it('should create a logger instance', () => {
    const logger  = LoggerUtils.createLogger('test');
    expect(logger !== null).to.be.true;
    expect(logger.transports.length).to.equal(2);
    expect(logger.exitOnError).to.equal(false);
  });
});
