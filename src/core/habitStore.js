import { cloneDeep } from '../utils/cloneDeep.js';
import { deepFreeze } from '../utils/deepFreeze.js';

export function createHabitStore() {
  const storage = new Map();

  return {
    add: function (habit) {
      if (storage.has(habit.id)) {
        throw new Error('Habit with this id already exists');
      }
      const clonedHabit = cloneDeep(habit);
      storage.set(clonedHabit.id, clonedHabit);
    },
    getById: function (id) {
      if (!storage.has(id)) {
        return undefined;
      }

      return deepFreeze(cloneDeep(storage.get(id)));
    },
    getAll: function () {
      const habits = storage.values();
      const habitList = Array.from(habits);

      return deepFreeze(cloneDeep(habitList));
    },
    remove: function (id) {
      return storage.delete(id);
    },
  };
}
