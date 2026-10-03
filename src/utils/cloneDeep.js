// Create copy of structuredClone() function 

export function cloneDeep(source) {

 if (typeof source !== 'object' || source === null) {
   return source;
 }

 if (Array.isArray(source)) {
   return source.map(item => cloneDeep(item));
 }

   const result = {};

   for (const [key, val] of Object.entries(source)) {
      result[key] = cloneDeep(val);
   }

   return result
};