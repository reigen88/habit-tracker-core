export function createHabit(input) {
    const title = (input.title ?? '').trim();

    if (title === '') {
        throw new Error('Title is required.');
    };

    return {
        id: crypto.randomUUID(),
        title, 
        goalPerDay: 1,
        createdAt: new Date().toISOString(),
        archivedAt: null, 
        log: {},
    };
}