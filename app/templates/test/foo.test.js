import assert from 'assert';
import foo from '../src/lib/foo';

describe('lib/foo', () => {
  it('should return bar', () => {
    const actual = foo();
    const expected = 'bar';
    assert.equal(actual, expected, 'yep, it returned bar');
  });
});
