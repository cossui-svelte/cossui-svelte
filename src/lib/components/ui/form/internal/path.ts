export function getValueAtPath(path: string, obj: Record<string, unknown>) {
  const keys = path.split(/[[\].]/).filter(Boolean);
  let value: unknown = obj;

  for (const key of keys) {
    if (typeof value !== 'object' || value === null) {
      return undefined; // Handle cases where the path doesn't exist in the object
    }
    value = (value as Record<string, unknown>)[key];
  }

  return value;
}
