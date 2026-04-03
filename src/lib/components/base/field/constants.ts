import type { FieldRootState, FieldValidityStateShape } from './context.js';

/** Default validity state before any validation has run. */
export const DEFAULT_VALIDITY_STATE: FieldValidityStateShape = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: null,
  valueMissing: false
};

/** Default field root state before any interaction. */
export const DEFAULT_FIELD_ROOT_STATE: FieldRootState = {
  dirty: false,
  disabled: false,
  filled: false,
  focused: false,
  touched: false,
  valid: null
};
