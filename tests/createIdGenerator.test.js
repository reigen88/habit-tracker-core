import { test } from 'node:test';
import assert from 'node:assert';
import { createIdGenerator } from '../src/utils/createIdGenerator.js';

test('returns prefixed id starting from 1', () => {
  const nextHabitId = createIdGenerator('habit');
  assert.equal(nextHabitId(), 'habit-1');
});
test('increments id on each call', () => {
  const nextHabitId = createIdGenerator('habit');
  assert.equal(nextHabitId(), 'habit-1');
  assert.equal(nextHabitId(), 'habit-2');
  assert.equal(nextHabitId(), 'habit-3');
});
test('keeps generators independent', () => {
  const nextHabitId = createIdGenerator('habit');
  const nextMarkId = createIdGenerator('mark');
  nextHabitId();
  assert.equal(nextHabitId(), 'habit-2');
  assert.equal(nextMarkId(), 'mark-1');
});
test('rejects invalid prefix', () => {
  const invalidEntries = [1, '', '   ', undefined];
  for (const entry of invalidEntries) {
    assert.throws(() => createIdGenerator(entry));
  }
});
test('accepts valid prefix', () => {
  assert.doesNotThrow(() => createIdGenerator('habit'));
});
