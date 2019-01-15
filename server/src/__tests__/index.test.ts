import { msg } from '../msg';

describe('simple test', () => {
  it('test msg() method', () => {
    expect(msg()).toBe('123');
  });
});
