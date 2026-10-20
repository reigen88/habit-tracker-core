import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cloneDeep } from '../src/utils/cloneDeep.js';

test('returns primitive values unchanged', () => {
  const primitives = ['prm', 1, undefined, true];
  for (const prm of primitives) {
    const cloned = cloneDeep(prm);
    assert.equal(cloned, prm);
  }
});

test('returns null unchanged', () => {
  const n = null;
  const cloned = cloneDeep(n);

  assert.equal(cloned, n);
});

test('copies nested objects by value, not by reference', () => {
  const obj = { status: { deep: 'deep' } };
  const cloned = cloneDeep(obj);

  assert.notEqual(cloned.status, obj.status);
  assert.deepEqual(cloned, obj);
});

test('copies nested arrays by value, not by reference', () => {
  const arr = [1, [2, 3]];
  const cloned = cloneDeep(arr);

  assert.notEqual(cloned[1], arr[1]);
  assert.deepEqual(cloned, arr);
});

test('clones Date preserving type and timestamp', () => {
  const date = new Date();
  const cloned = cloneDeep(date);

  assert.ok(cloned instanceof Date);
  assert.notEqual(cloned, date);
  assert.equal(cloned.getTime(), date.getTime());
});

test('clones Map preserving type and cloning nested values', () => {
  const map = new Map([['fruit', { name: 'apple' }]]);
  const cloned = cloneDeep(map);

  assert.ok(cloned instanceof Map);
  assert.deepEqual(cloned, map);
  assert.notEqual(cloned, map);
  assert.notEqual(cloned.get('fruit'), map.get('fruit'));
});

test('clones Set preserving type and size', () => {
  const set = new Set([1, [2, 3]]);
  const cloned = cloneDeep(set);

  assert.ok(cloned instanceof Set);
  assert.notEqual(cloned, set);
  assert.equal(cloned.size, set.size);
});

test('handles circular references without RangeError', () => {
  const box = {};
  box.inside = box;

  assert.doesNotThrow(() => cloneDeep(box));
});

test('preserves shared references between properties', () => {
  const obj = { num: 1 };
  const source = { a: obj, b: obj };

  const cloned = cloneDeep(source);

  assert.equal(cloned.b, cloned.a);
  assert.notEqual(cloned.a, source.a);
});

test('does not mutate the source structure', () => {
  const source = {
    obj: { key: 'val' },
    arr: [1, 2, 3],
    map: new Map([[1, 2]]),
    set: new Set([1, 2]),
    date: new Date(0),
  };

  const expected = {
    obj: { key: 'val' },
    arr: [1, 2, 3],
    map: new Map([[1, 2]]),
    set: new Set([1, 2]),
    date: new Date(0),
  };

  cloneDeep(source);

  assert.deepEqual(source, expected);
});
