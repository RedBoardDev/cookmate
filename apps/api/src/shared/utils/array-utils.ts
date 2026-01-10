/**
 * Compare two arrays for equality (order-independent)
 * @param a First array
 * @param b Second array
 * @returns true if arrays contain the same elements (ignoring order)
 */
export function arraysEqual<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((val, index) => val === sortedB[index]);
}
