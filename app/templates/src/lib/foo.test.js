import assert from 'assert';
const foo = () => 'bar';

describe('lib/foo', () => {
  it('should return bar', () => {
    const actual = foo();
    const expected = 'bar';
    assert.equal(actual, expected, 'yep, it returned bar');
  });
});
