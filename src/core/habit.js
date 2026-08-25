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
}