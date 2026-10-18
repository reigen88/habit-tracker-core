export function cloneDeep(value, seen = new WeakMap()) {
   if (seen.has(value)) { return seen.get(value) }

   if (typeof value !== 'object' || value === null) {
      return value;
   }

   if (Array.isArray(value)) {
      const result = []; 
      seen.set(value, result);

      for (const val of value) {
         result.push(cloneDeep(val, seen));
      }

      return result;
   }

   if (value instanceof Date) {
      return new Date(value);
   }

   if (value instanceof Map) {
      const result = new Map();
      seen.set(value, result);

      const entries = [...value];

      for (const [key, val] of entries) {
         result.set(cloneDeep(key, seen), cloneDeep(val, seen));
      }

      return result;
   }

   if (value instanceof Set) {
      const result = new Set();
      seen.set(value, result);

      for (const val of value) {
         result.add(cloneDeep(val, seen))
      }

      return result;
   }


   const result = {};
   const entries = Object.entries(value);
   seen.set(value, result)

   for (const [key, val] of entries) {
      result[key] = cloneDeep(val, seen);
   }

   return result;
}