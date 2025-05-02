const { describe, it } = require('node:test');
const bounds = require('..');

describe('bounds', () => {
  it('should fail on empty', t => {
    t.assert.equal(bounds([])([1, 1]), false);
  });

  it('should succeed if point is in the range', t => {
    t.assert.ok(bounds([[[-1, 0], [3, 5]]])([1, 1]));
  });

  it('should succeed if point is on the border', t => {
    t.assert.ok(bounds([[[0, 0], [1, 1]]])([0, 1]));
  });

  it('should succeed if point is in one of the ranges', t => {
    t.assert.ok(bounds([[[-1, 0], [3, 5]], [[100, 20], [115, 80]]])([1, 1]));
  });

  it('should succeed if point is inside the polygon', t => {
    t.assert.ok(bounds([[[ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ]]])([1.5, 1.5]));
  });

  it('should succeed if point is on the border of the polygon', t => {
    t.assert.ok(bounds([[[ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ]]])([1, 1]));
  });

  it('should succeed if point is in one of the shapes', t => {
    t.assert.ok(bounds([[[ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ]], [[2, 2], [4, 4]]])([3, 3]));
  });

  it('should fail point is in none of the ranges', t => {
    t.assert.equal(bounds([[[-1, 0], [3, 5]], [[100, 20], [115, 80]]])([4, 1]), false);
  });

  it('bounds extend', t => {
    const bnds = bounds();
    t.assert.equal(bnds([0, 1]), false);
    t.assert.equal(bnds([1, 0]), false);
    bnds.extend([0, 1]);
    bnds.extend([1, 0]);
    t.assert.ok(bnds([0, 0]));
    t.assert.ok(bnds([0, 1]));
    t.assert.ok(bnds([1, 0]));
    t.assert.ok(bnds([1, 1]));

    t.assert.deepEqual(bnds.get(), [[[0, 0], [1, 1]]]);

    t.assert.equal('extend' in bounds([]) ,false);
    t.assert.equal('extend' in bounds([[[0.5, 0.5], [1, 1]]]), false);
  });
});
