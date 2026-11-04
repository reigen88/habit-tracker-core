import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHabitStore } from '../src/core/habitStore.js';
import { createHabit } from '../src/core/habit.js';

test('add stores habit', () => {
  const habit = createHabit({ title: 'Read' });
  const store = createHabitStore();
  store.add(habit);

  assert.deepEqual(store.getById(habit.id), habit);
});

test('add rejects duplicate id', () => {
  const habit = createHabit({ title: 'Read' });
  const store = createHabitStore();
  store.add(habit);

  assert.throws(() => store.add(habit));
});

test('getById finds stored habit', () => {
  const habit = createHabit({ title: 'Read' });
  const habit2 = createHabit({ title: 'Sleep' });
  const store = createHabitStore();
  store.add(habit);
  store.add(habit2);

  assert.deepEqual(store.getById(habit2.id), habit2);
});

test('getById returns undefined for unknown id', () => {
  const habit = createHabit({ title: 'Read' });
  const store = createHabitStore();
  store.add(habit);

  assert.equal(store.getById('non-existent id'), undefined);
});

test('getAll returns all stored habits', () => {
  const habit = createHabit({ title: 'Read' });
  const habit2 = createHabit({ title: 'Sleep' });
  const store = createHabitStore();
  store.add(habit);
  store.add(habit2);

  assert.deepEqual(store.getAll(), [habit, habit2]);
});

test('getAll returns empty array for empty store', () => {
  const store = createHabitStore();

  assert.deepEqual(store.getAll(), []);
});

test('remove deletes habit and returns true', () => {
  const habit = createHabit({ title: 'Read' });
  const store = createHabitStore();
  store.add(habit);

  assert.equal(store.remove(habit.id), true);
  assert.equal(store.getById(habit.id), undefined);
});

test('remove returns false for unknown id', () => {
  const store = createHabitStore();

  assert.equal(store.remove('non-existent id'), false);
});

test('add stores a copy, not the original reference', () => {
  const habit = { title: 'Read', id: '123' };
  const store = createHabitStore();
  store.add(habit);
  habit.title = 'Sleep';

  assert.notDeepEqual(store.getById(habit.id), habit);
});

test('getById returns a copy, not the stored reference', () => {
  const habit = createHabit({ title: 'Read' });
  const store = createHabitStore();
  store.add(habit);

  assert.notEqual(store.getById(habit.id), store.getById(habit.id));
  assert.deepEqual(store.getById(habit.id), store.getById(habit.id));
});

test('stores are independent', () => {
  const habit = createHabit({ title: 'Read' });
  const store = createHabitStore();
  const store2 = createHabitStore();
  store.add(habit);

  assert.equal(store2.getById(habit.id), undefined);
});
