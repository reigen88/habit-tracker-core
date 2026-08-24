import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHabit } from '../src/core/habit.js';

test('goalPerDay по умолчанию равен 1', () => {
  const h = createHabit({ title: 'Читать' });
  assert.equal(h.goalPerDay, 1);
});