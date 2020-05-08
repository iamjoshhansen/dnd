export interface ObjectDelta {
  c?: Record<string, any>;
  u?: Record<string, any>;
  d?: string[];
}

export function objectDelta(
  a: Record<string, any>,
  b: Record<string, any>
): ObjectDelta {
  const ret: ObjectDelta = {};

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  // Declare Creations
  const cKeys = difference(bKeys, aKeys);
  const c: Record<string, any> = {};
  cKeys.forEach((k) => (c[k] = b[k]));
  if (cKeys.length > 0) {
    ret.c = c;
  }

  // Declare Updates
  const u: Record<string, any> = {};
  const uKeys = union(aKeys, bKeys);
  uKeys.forEach((k) => {
    const aVal = a[k];
    const bVal = b[k];
    if (type(aVal) !== type(bVal)) {
      u[k] = bVal;
    } else {
      if (type(aVal) === 'object' || type(aVal) === 'array') {
        if (JSON.stringify(aVal) !== JSON.stringify(bVal)) {
          u[k] = bVal;
        }
      } else {
        if (aVal !== bVal) {
          u[k] = bVal;
        }
      }
    }
  });

  if (Object.keys(u).length > 0) {
    ret.u = u;
  }

  // Declare Deletions
  const d = difference(aKeys, bKeys);
  if (d.length > 0) {
    ret.d = d;
  }

  return ret;
}

export function type(x: any): string {
  if (x === null) {
    return 'null';
  }

  const typeOfX = typeof x;
  switch (typeOfX) {
    case 'undefined':
    case 'number':
    case 'boolean':
    case 'string':
      return typeOfX;
  }

  try {
    Object.constructor(x);
    return 'array';
  } catch {
    return 'object';
  }
}

export function difference(a: string[], b: string[]): string[] {
  const diff: string[] = [];
  a.forEach((av) => {
    if (!b.includes(av)) {
      diff.push(av);
    }
  });
  return diff;
}

export function union(a: string[], b: string[]): string[] {
  const diff: string[] = [];
  a.forEach((av) => {
    if (b.includes(av)) {
      diff.push(av);
    }
  });
  return diff;
}

export function applyDelta(obj: Record<string, any>, delta: ObjectDelta) {
  const { c, u, d } = delta;

  if (d) {
    d.forEach((k) => delete obj[k]);
  }

  if (u) {
    Object.keys(u).forEach((k) => (obj[k] = u[k]));
  }

  if (c) {
    Object.keys(c).forEach((k) => (obj[k] = c[k]));
  }
}

export interface MongoOp {
  $set?: Record<string, any>;
  $unset?: Record<string, ''>;
}

export function deltaToMongoOp(delta: ObjectDelta): MongoOp {
  const op: MongoOp = {};
  const { c, u, d } = delta;

  if (c) {
    op.$set = op.$set || {};
    Object.keys(c).forEach((k) => ((op.$set as Record<string, any>)[k] = c[k]));
  }

  if (u) {
    op.$set = op.$set || {};
    Object.keys(u).forEach((k) => ((op.$set as Record<string, any>)[k] = u[k]));
  }

  if (d) {
    op.$unset = {};
    d.forEach((k) => ((op.$unset as Record<string, ''>)[k] = ''));
  }

  return op;
}
