export function cloneDeep(value) {

   if (typeof value !== 'object' || value === null) {
      return value;
   }


   if (Array.isArray(value)) {
      return value.map(item => cloneDeep(item));
   }

   if (value instanceof Date) {
      return new Date(value);
   }

   if (value instanceof Map) {
      const entries = [...value];
      const clonedEntries = entries.map(item => cloneDeep(item));
      const result = new Map(clonedEntries)

      return result;
   }


   const result = {};
   const entries = Object.entries(value);

   for (const [key, val] of entries) {
      result[key] = cloneDeep(val);
   }
   return result;
}