/**
 * Splits an array into chunks of a given size.
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) return [];
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Checks if the given index is valid for the given array.
 */
export function isValidIndex(index: number, arr: unknown[]) {
  return index >= 0 && index < arr.length;
}
