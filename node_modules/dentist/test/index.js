import { dedent } from '../src';

describe('dedent()', () => {
  it('should return the input if it doesn\'t contain any newlines', () => {
    dedent('hello world').should.equal('hello world');
  });

  it('should remove indentation', () => {
    dedent(`
      hello world
    `).should.equal('hello world');
  });

  it('should remove the minimum indentation', () => {
    dedent(`
        indented line

      another line
    `).should.equal('  indented line\n\nanother line');
  });
});

describe('dedent``', () => {
  // TODO: support tagged template strings
});
