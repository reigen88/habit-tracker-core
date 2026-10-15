export function cloneDeep(value) {

   if (typeof value !== 'object' || value === null) {
      return value;
   }


   if (Array.isArray(value)) {
      return value.map(item => cloneDeep(item));
   }


   const result = {};
   const entries = Object.entries(value);

   for (const [key, val] of entries) {
      result[key] = cloneDeep(val);
   }
   return result;
}