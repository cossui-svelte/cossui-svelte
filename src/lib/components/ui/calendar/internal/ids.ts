let idCounter = 0;

/**
 * Generates a unique ID based on a module-level counter.
 */
export function useId(prefix = 'bits') {
  idCounter++;
  return `${prefix}-${idCounter}`;
}

export function createId(uid: string) {
  return `bits-${uid}`;
}
