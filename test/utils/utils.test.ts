import {expect} from 'chai';
import 'mocha';
import Utils from "../../src/utils/utils";

describe('utils', () => {
  it('should convert \'test\' to Kebab case', () => {
    const value  = Utils.convertKebabCase('test');
    expect(value).to.equal('test');
  });
  it('should convert \'TestApp\' to Kebab case', () => {
    const value  = Utils.convertKebabCase('TestApp');
    expect(value).to.equal('test-app');
  });
  it('should convert \'TestAppAgainAndAgain\' to Kebab case', () => {
    const value  = Utils.convertKebabCase('TestAppAgainAndAgain');
    expect(value).to.equal('test-app-again-and-again');
  });
});
