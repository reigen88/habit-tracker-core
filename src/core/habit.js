export function createHabit(input = {}) {

    const title = (input.title ?? '').trim();

    if (title === '') {
        throw new Error('Title is required.');
    };

    const goalPerDay = input.goalPerDay ?? 1;
    const id = input.id ?? crypto.randomUUID();
    const createdAt = input.createdAt ?? new Date().toISOString();
    
    return Object.freeze({
        id,
        title, 
        goalPerDay,
        createdAt,
        archivedAt: null, 
        log: {},
    });
};


export function renameHabit(habit, newTitle) {

    const title = (newTitle ?? '').trim();
    if (title === '') {
        throw new Error('Title is required.');
    }

    const newHabit = Object.freeze({...habit, title});
    
    return newHabit;
};


export function markDay(habit, dateKey, count = 1) {

    const newDate = (dateKey ?? '').trim();
    if (newDate === '') {
        throw new Error('Date is required');
    }

    const log = {...habit.log, [newDate]: count};

    const newHabit = Object.freeze({...habit, log});
    return newHabit;
}


export function unmarkDay(habit, dateKey) {

    const newDate = (dateKey ?? '').trim();
    if (newDate === '') {
        throw new Error('Date is required');
    }

    const { [newDate]: removed, ...editedLog} = habit.log;

    const newHabit = Object.freeze({...habit, log: editedLog});

    return newHabit;
};