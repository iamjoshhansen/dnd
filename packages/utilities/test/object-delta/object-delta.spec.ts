import { expect } from 'chai';
import {
  objectDelta,
  difference,
  union,
  applyDelta,
  deltaToMongoOp,
  type,
} from '../../src/object-delta';

describe('objectDelta', () => {
  it('single creation', () => {
    expect(objectDelta({}, { b: 'bravo' })).to.eql({
      c: {
        b: 'bravo',
      },
    });
  });

  it('single deletion', () => {
    expect(objectDelta({ b: 'bravo' }, {})).to.eql({
      d: ['b'],
    });
  });

  it('single update', () => {
    expect(objectDelta({ a: 'alpha' }, { a: 'Alpha' })).to.eql({
      u: {
        a: 'Alpha',
      },
    });
  });

  it('create and delete', () => {
    expect(objectDelta({ a: 'alpha' }, { b: 'Bravo' })).to.eql({
      c: {
        b: 'Bravo',
      },
      d: ['a'],
    });
  });

  it('create, update, and delete', () => {
    expect(
      objectDelta({ a: 'alpha', b: 'bravo' }, { b: 'Bravo', c: 'Charlie' })
    ).to.eql({
      c: {
        c: 'Charlie',
      },
      u: {
        b: 'Bravo',
      },
      d: ['a'],
    });
  });

  it('create, (no) update, and delete', () => {
    expect(
      objectDelta({ a: 'alpha', b: 'bravo' }, { b: 'bravo', c: 'Charlie' })
    ).to.eql({
      c: {
        c: 'Charlie',
      },
      d: ['a'],
    });
  });
});

describe('difference', () => {
  it('(empty) - (empty)', () => {
    expect(difference([], [])).to.eql([]);
  });

  it('a - (empty)', () => {
    expect(difference(['a'], [])).to.eql(['a']);
  });

  it('(empty) - a', () => {
    expect(difference([], ['a'])).to.eql([]);
  });

  it('a - b', () => {
    expect(difference(['a'], ['b'])).to.eql(['a']);
  });

  it('ab - b', () => {
    expect(difference(['a', 'b'], ['b'])).to.eql(['a']);
  });

  it('a - ab', () => {
    expect(difference(['a'], ['a', 'b'])).to.eql([]);
  });

  it('ab - c', () => {
    expect(difference(['a', 'b'], ['c'])).to.eql(['a', 'b']);
  });

  it('c - ab', () => {
    expect(difference(['c'], ['a', 'b'])).to.eql(['c']);
  });
});

describe('union', () => {
  it('(empty) U (empty)', () => {
    expect(union([], [])).to.eql([]);
  });

  it('a U (empty)', () => {
    expect(union(['a'], [])).to.eql([]);
  });

  it('(empty) U a', () => {
    expect(union([], ['a'])).to.eql([]);
  });

  it('a U b', () => {
    expect(union(['a'], ['b'])).to.eql([]);
  });

  it('ab U b', () => {
    expect(union(['a', 'b'], ['b'])).to.eql(['b']);
  });

  it('a U ab', () => {
    expect(union(['a'], ['a', 'b'])).to.eql(['a']);
  });

  it('ab U c', () => {
    expect(union(['a', 'b'], ['c'])).to.eql([]);
  });

  it('c U ab', () => {
    expect(union(['c'], ['a', 'b'])).to.eql([]);
  });
});

describe('applyDelta', () => {
  it('single creation', () => {
    const obj = {};
    applyDelta(obj, {
      c: {
        b: 'bravo',
      },
    });
    expect(obj).to.eql({ b: 'bravo' });
  });

  it('single deletion', () => {
    const obj = { b: 'bravo' };
    applyDelta(obj, {
      d: ['b'],
    });
    expect(obj).to.eql({});
  });

  it('single update', () => {
    const obj = { a: 'alpha' };
    applyDelta(obj, {
      u: {
        a: 'Alpha',
      },
    });
    expect(obj).to.eql({ a: 'Alpha' });
  });

  it('create and delete', () => {
    const obj = { a: 'alpha' };
    applyDelta(obj, {
      c: {
        b: 'Bravo',
      },
      d: ['a'],
    });
    expect(obj).to.eql({ b: 'Bravo' });
  });

  it('create, update, and delete', () => {
    const obj = { a: 'alpha', b: 'bravo' };
    applyDelta(obj, {
      c: {
        c: 'Charlie',
      },
      u: {
        b: 'Bravo',
      },
      d: ['a'],
    });
    expect(obj).to.eql({ b: 'Bravo', c: 'Charlie' });
  });

  it('create, (not) update, and delete', () => {
    const obj = { a: 'alpha', b: 'bravo' };
    applyDelta(obj, {
      c: {
        c: 'Charlie',
      },
      d: ['a'],
    });
    expect(obj).to.eql({ b: 'bravo', c: 'Charlie' });
  });
});

describe('deltaToMongoOp', () => {
  it('single creation', () => {
    expect(
      deltaToMongoOp({
        c: {
          b: 'bravo',
        },
      })
    ).to.eql({
      $set: {
        b: 'bravo',
      },
    });
  });

  it('single deletion', () => {
    expect(
      deltaToMongoOp({
        d: ['b'],
      })
    ).to.eql({
      $unset: {
        b: '',
      },
    });
  });

  it('single update', () => {
    expect(
      deltaToMongoOp({
        u: {
          a: 'Alpha',
        },
      })
    ).to.eql({
      $set: { a: 'Alpha' },
    });
  });

  it('create and delete', () => {
    expect(
      deltaToMongoOp({
        c: {
          b: 'Bravo',
        },
        d: ['a'],
      })
    ).to.eql({
      $set: { b: 'Bravo' },
      $unset: { a: '' },
    });
  });

  it('create, update, and delete', () => {
    expect(
      deltaToMongoOp({
        c: {
          c: 'Charlie',
        },
        u: {
          b: 'Bravo',
        },
        d: ['a'],
      })
    ).to.eql({
      $set: { b: 'Bravo', c: 'Charlie' },
      $unset: { a: '' },
    });
  });

  it('create, (not) update, and delete', () => {
    expect(
      deltaToMongoOp({
        c: {
          c: 'Charlie',
        },
        d: ['a'],
      })
    ).to.eql({
      $set: { c: 'Charlie' },
      $unset: { a: '' },
    });
  });
});

describe('type', () => {
  it('object', () => {
    expect(type({})).to.eq('object');
  });

  it('array', () => {
    expect(type([])).to.eq('array');
  });

  it('undefined', () => {
    expect(type(undefined)).to.eq('undefined');
  });

  it('Date', () => {
    expect(type(new Date())).to.eq('object');
  });

  it('null', () => {
    expect(type(null)).to.eq('null');
  });

  it('number', () => {
    expect(type(42)).to.eq('number');
  });

  it('number (0)', () => {
    expect(type(0)).to.eq('number');
  });

  it('string', () => {
    expect(type('42')).to.eq('string');
  });

  it('string (empty)', () => {
    expect(type('')).to.eq('string');
  });

  it('boolean (true)', () => {
    expect(type(true)).to.eq('boolean');
  });

  it('boolean (false)', () => {
    expect(type(false)).to.eq('boolean');
  });
});
