export function deepFreeze(value, seen = new WeakSet()) {
    if (seen.has(value)) {
        return value;
    }
    
    seen.add(value);

    Object.freeze(value);

    for(const v of Object.values(value)) {
        if (typeof v === 'object' && v !== null) {
            deepFreeze(v, seen);
        }
    };

    return value;
}