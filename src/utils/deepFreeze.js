export function deepFreeze(value) {
    Object.freeze(value);

    for(const v of Object.values(value)) {
        if (typeof v === 'object' && v !== null) {
            deepFreeze(v);
        }
    };

    return value;
}