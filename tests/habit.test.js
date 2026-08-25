import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHabit } from '../src/core/habit.js';
import { title } from 'node:process';

test('goalPerDay default value = 1', () => {
  const h = createHabit({ title: 'Read' });
  assert.equal(h.goalPerDay, 1);
});

test('goalPerDay value keeps 0, not switching to 1', () => {
  const h = createHabit({title: 'Read', goalPerDay: 0});
  assert.equal(h.goalPerDay, 0);
});

test('throws when title is empty or whitespace only', () => {
  assert.throws(() => createHabit({title: ' '}), /Title is required/);
});

test('throws on attempt to mutate frozen habit', () => {
  const h = createHabit({title: 'Read'});
  assert.throws(() => {h.title = 'X'}, TypeError);
});

test('generates unique id for each habit', () => {
  const h1 = createHabit({title: 'Read'});
  const h2 = createHabit({title: 'Read'});
  assert.notEqual(h1.id, h2.id);
});

test('ignores unknown fields from input', () => {
  const h = createHabit({title: 'Read', hacked: true});
  assert.equal(h.hacked, undefined);
});