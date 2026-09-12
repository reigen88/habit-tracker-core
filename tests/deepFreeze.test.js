import { test } from 'node:test';
import assert from 'node:assert/strict';
import { deepFreeze } from '../src/utils/deepFreeze.js';

test('freezes nested objects', () => {
    const h = deepFreeze({ a: { b: 1 } });
    assert.throws(() => {h.a.b = 2}, TypeError);
});

test('freezes deeply nested objects', () => {
    const obj = deepFreeze({ a: { b: { c: 1 } } });
    assert.throws(() => {obj.a.b.c = 2}, TypeError);
});

test('handles circular references without stack overflow', () => {
    const a = {good: 'day'};
    const b = {};

    a.child = b;
    b.parent = a;

    deepFreeze(a);
    assert.ok(Object.isFrozen(a));
});

test('returns the same object, not a copy', () => {
    let obj = {};
    const result = deepFreeze(obj);
    assert.equal(result, obj)
});