import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHabit } from '../src/core/habit.js';

test('createHabit returns object with title', () => {
  assert.equal(createHabit({ title: 'Read' }).title, 'Read');
});