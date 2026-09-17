import { test } from 'node:test';
import assert from 'node:assert/strict';
import { title } from 'node:process';
import { createHabit, renameHabit, markDay, unmarkDay } from '../src/core/habit.js';

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

test('habit can be renamed', () => {
  const h = createHabit({title: 'Read'});
  const renamed = renameHabit(h, 'Write');

  assert.equal(renamed.title, 'Write');
});

test('renameHabit does not mutate the original', () => {
  const h = createHabit({title: 'Read'});
  const renamed = renameHabit(h, 'Write');

  assert.equal(h.title, 'Read');
});

test('renameHabit keeps the same id', () => {
  const h = createHabit({title: 'Read'});
  const renamed = renameHabit(h, 'Write');

  assert.equal(h.id, renamed.id);
});

test('markDay adds record to log', () => {
  const h = createHabit({ title: 'Read' });
  const marked = markDay(h, '2026-08-24');

  assert.equal(marked.log['2026-08-24'], 1);
});

test('markDay does not mutate the previous log', () => {
  const h1 = createHabit({ title: 'Read' });
  const h2 = markDay(h1, '2026-08-24');
  const h3 = markDay(h2, '2026-08-25'); 

  assert.equal(Object.keys(h2.log).length, 1);
});

test('unmarkDay removes only the given date', () => {
  const h1 = createHabit({ title: 'Read' });
  const h2 = markDay(h1, '2026-08-24');
  const h3 = markDay(h2, '2026-08-25');
  const h4 = unmarkDay(h3, '2026-08-24');

  assert.equal(Object.hasOwn(h4.log, '2026-08-24'), false);
  assert.equal(h4.log['2026-08-25'], 1)
});

test('unmarkDay does not fail on missing date', () => {
  const h1 = createHabit({ title: 'Read' });
  const h2 = markDay(h1, '2026-08-24');
  const h3 = unmarkDay(h2, '2099-01-01');

  assert.equal(h3.log['2026-08-24'], 1);
});