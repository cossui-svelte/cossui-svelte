/**
 * Extracts the error array from a `ValidationErrors` object.
 */
export function extractErrorArray(errors: unknown): string[] {
  if (Array.isArray(errors)) return [...errors];
  if (errors && typeof errors === 'object' && '_errors' in errors) {
    const nestedErrors = (errors as { _errors?: unknown })._errors;
    if (Array.isArray(nestedErrors)) return [...nestedErrors];
  }

  return [];
}
