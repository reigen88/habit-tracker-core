export function createIdGenerator(prefix) {
  if (typeof prefix !== 'string' || prefix.trim() === '') {
    throw new Error('Prefix must be a string and filled');
  }

  let count = 0;

  return function () {
    return `${prefix}-${++count}`;
  };
}
