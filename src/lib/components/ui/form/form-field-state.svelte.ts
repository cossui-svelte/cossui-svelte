/* eslint-disable @typescript-eslint/no-explicit-any */
import { getContext, hasContext, setContext } from 'svelte';
import { fromStore } from 'svelte/store';
import {
  box,
  type Getter,
  type ReadableBoxedValues,
  useOnChange,
  useRefById,
  type WithRefProps
} from 'svelte-toolbelt';
import type { FormPath, InputConstraint, InputConstraints, SuperForm } from 'sveltekit-superforms';
import type { FormPathArrays, TaintedFields, ValidationErrors } from 'sveltekit-superforms/client';
import type {
  ControlAttrs,
  DescriptionAttrs,
  ErrorAttrs,
  FieldErrorsAttrs,
  LabelAttrs
} from './form-field-attrs.js';
import type { PrimitiveFromIndex } from './internal/types.js';
import {
  getAriaDescribedBy,
  getAriaInvalid,
  getAriaRequired,
  getDataFsError
} from './internal/attributes';
import { extractErrorArray } from './internal/errors';
import { useId } from './internal/id';
import { getValueAtPath } from './internal/path';

export type FsSuperForm<T extends Record<string, unknown>, M = any> = Omit<
  SuperForm<T, M>,
  'validate' | 'validateForm' | 'enhance' | 'isTainted' | 'reset' | 'options' | 'restore'
> & {
  validate?: any;
  validateForm?: any;
  enhance?: any;
  isTainted?: any;
  reset?: any;
  options?: any;
  restore?: any;
};

type SvelteBox<T> = {
  current: T;
};

type FieldState<T extends Record<string, unknown>, U extends FormPath<T>> =
  | FormFieldState<T, U>
  | ElementFieldState<T, U>;

type FormFieldStateProps<
  T extends Record<string, unknown>,
  U extends FormPath<T>,
  M = any
> = ReadableBoxedValues<{
  form: FsSuperForm<T, M>;
  name: U;
}>;

class FormFieldState<T extends Record<string, unknown>, U extends FormPath<T>> {
  #name: FormFieldStateProps<T, U>['name'];
  #formErrors: SvelteBox<ValidationErrors<T>>;
  #formConstraints: SvelteBox<InputConstraints<T>>;
  #formTainted: SvelteBox<TaintedFields<T> | undefined>;
  #formData: SvelteBox<T>;
  form: FsSuperForm<T>;

  name = $derived.by(() => this.#name.current);
  errors = $derived.by(() =>
    extractErrorArray(getValueAtPath(this.#name.current, structuredClone(this.#formErrors.current)))
  );
  constraints = $derived.by(
    () => getValueAtPath(this.#name.current, structuredClone(this.#formConstraints.current)) ?? {}
  );
  tainted = $derived.by(() =>
    this.#formTainted.current
      ? getValueAtPath(this.#name.current, structuredClone(this.#formTainted.current)) === true
      : false
  );
  errorNode = $state<HTMLElement | null>(null);
  descriptionNode = $state<HTMLElement | null>(null);
  errorId = $state<string>();
  descriptionId = $state<string>();
  controlId = $state<string | undefined>();

  constructor(props: FormFieldStateProps<T, U>) {
    this.#name = props.name;
    this.form = props.form.current;
    this.#formErrors = fromStore(props.form.current.errors);
    this.#formConstraints = fromStore(props.form.current.constraints);
    this.#formTainted = fromStore(props.form.current.tainted);
    this.#formData = fromStore(props.form.current.form);

    $effect(() => {
      if (this.errorNode && this.errorNode.id) {
        this.errorId = this.errorNode.id;
      }
    });

    $effect(() => {
      if (this.descriptionNode && this.descriptionNode.id) {
        this.descriptionId = this.descriptionNode.id;
      }
    });
  }

  snippetProps = $derived.by(
    () =>
      ({
        constraints: this.constraints,
        errors: this.errors,
        tainted: this.tainted,
        value: this.#formData.current[this.#name.current]
      }) as const
  );
}

type ElementFieldStateProps<
  T extends Record<string, unknown>,
  U extends FormPath<T>,
  M = any
> = ReadableBoxedValues<{
  form: FsSuperForm<T, M>;
  name: U;
}>;

class ElementFieldState<T extends Record<string, unknown>, U extends FormPath<T>> {
  #name: ElementFieldStateProps<T, U>['name'];
  #formErrors: SvelteBox<ValidationErrors<T>>;
  #formConstraints: SvelteBox<InputConstraints<T>>;
  #formTainted: SvelteBox<TaintedFields<T> | undefined>;
  #formData: SvelteBox<T>;
  #field: FieldState<T, U>;
  form: FsSuperForm<T>;
  name = $derived.by(() => {
    const [path] = splitArrayPath<T>(this.#name.current);
    return path as U;
  });
  errors = $derived.by(() =>
    extractErrorArray(getValueAtPath(this.#name.current, this.#formErrors.current))
  );
  constraints = $derived.by(
    () => getValueAtPath(this.#name.current, this.#formConstraints.current) ?? {}
  );
  tainted = $derived.by(() =>
    this.#formTainted.current
      ? getValueAtPath(this.#name.current, this.#formTainted.current) === true
      : false
  );
  errorNode = $state<HTMLElement | null>(null);
  descriptionNode = $state<HTMLElement | null>(null);
  errorId = $state<string>();
  descriptionId = $state<string>();
  controlId = $state<string | undefined>();
  // fall back to the parent field's description node if one for
  // this specific element doesn't exist.
  derivedDescriptionNode = $derived.by(() => {
    if (this.descriptionNode) return this.descriptionNode;
    if (this.#field.descriptionNode) return this.#field.descriptionNode;
    return null;
  }) as HTMLElement | null;
  value = $derived.by(() => {
    return getValueAtPath(this.#name.current, this.#formData.current) as PrimitiveFromIndex<T, U>;
  });

  constructor(props: ElementFieldStateProps<T, U>, field: FieldState<T, U>) {
    this.#name = props.name;
    this.form = props.form.current;
    this.#formErrors = fromStore(props.form.current.errors);
    this.#formConstraints = fromStore(props.form.current.constraints);
    this.#formTainted = fromStore(props.form.current.tainted);
    this.#formData = fromStore(props.form.current.form);
    this.#field = field;

    useOnChange(
      () => this.errorNode,
      (v) => {
        if (v && v.id) {
          this.errorId = v.id;
        }
      }
    );

    useOnChange(
      () => this.descriptionNode,
      (v) => {
        if (v && v.id) {
          this.descriptionId = v.id;
        }
      }
    );
  }

  snippetProps = $derived.by(
    () =>
      ({
        constraints:
          // @ts-expect-error - this type is wonky
          this.#formConstraints.current[this.#name.current] ?? ({} as InputConstraint),
        errors: this.errors,
        tainted: this.tainted,
        value: this.#formData.current[this.#name.current]
      }) as const
  );
}

type FieldErrorsStateProps = WithRefProps;

class FieldErrorsState<T extends Record<string, unknown>, U extends FormPath<T>> {
  #ref: FieldErrorsStateProps['ref'];
  #id: FieldErrorsStateProps['id'];
  field: FieldState<T, U>;
  #errorAttr = $derived.by(() => getDataFsError(this.field.errors));

  constructor(props: FieldErrorsStateProps, field: FieldState<T, U>) {
    this.#ref = props.ref;
    this.#id = props.id;
    this.field = field;

    useRefById({
      id: this.#id,
      onRefChange: (node) => {
        this.field.errorNode = node;
      },
      ref: this.#ref
    });
  }

  snippetProps = $derived.by(() => ({
    errorProps: this.errorProps,
    errors: this.field.errors
  }));

  fieldErrorsProps = $derived.by(
    () =>
      ({
        'aria-live': 'assertive',
        'data-fs-error': this.#errorAttr,
        'data-fs-field-errors': '',
        id: this.#id.current
      }) satisfies FieldErrorsAttrs
  );

  errorProps = $derived.by(
    () =>
      ({
        'data-fs-error': this.#errorAttr,
        'data-fs-field-error': ''
      }) satisfies ErrorAttrs
  );
}

type DescriptionStateProps = WithRefProps;

class DescriptionState {
  #ref: DescriptionStateProps['ref'];
  #id: DescriptionStateProps['id'];
  field: FieldState<Record<string, unknown>, string>;

  constructor(props: DescriptionStateProps, field: FieldState<Record<string, unknown>, string>) {
    this.#ref = props.ref;
    this.#id = props.id;
    this.field = field;

    useRefById({
      id: this.#id,
      onRefChange: (node) => {
        this.field.descriptionNode = node;
      },
      ref: this.#ref
    });
  }

  props = $derived.by(
    () =>
      ({
        'data-fs-description': '',
        'data-fs-error': getDataFsError(this.field.errors),
        id: this.#id.current
      }) satisfies DescriptionAttrs
  );
}

type ControlStateProps = ReadableBoxedValues<{
  id: string;
}>;

class ControlState {
  #id: ControlStateProps['id'];
  field: FieldState<Record<string, unknown>, string>;
  labelId: ControlStateProps['id'] = box(useId());
  id = $state(useId());

  constructor(props: ControlStateProps, field: FieldState<Record<string, unknown>, string>) {
    this.#id = props.id;
    this.field = field;

    useOnChange(
      () => this.#id.current,
      (v) => {
        this.id = v;
      }
    );

    $effect(() => {
      field.controlId = this.id;
    });
  }

  props = $derived.by(
    () =>
      ({
        'aria-describedby': getAriaDescribedBy({
          descriptionId: this.field.descriptionId,
          errors: this.field.errors,
          fieldErrorsId: this.field.errorId
        }),
        'aria-invalid': getAriaInvalid(this.field.errors),
        'aria-required': getAriaRequired(this.field.constraints),
        'data-fs-control': '',
        'data-fs-error': getDataFsError(this.field.errors),
        id: this.id,
        name: this.field.name
      }) satisfies ControlAttrs
  );

  labelProps = $derived.by(
    () =>
      ({
        'data-fs-error': getDataFsError(this.field.errors),
        'data-fs-label': '',
        for: this.id,
        id: this.labelId.current
      }) satisfies LabelAttrs
  );
}

type LabelStateProps = WithRefProps;

class LabelState {
  #ref: LabelStateProps['ref'];
  #id: LabelStateProps['id'];
  control: ControlState | undefined;
  field: FieldState<Record<string, unknown>, string> | undefined;

  constructor(
    props: LabelStateProps,
    control: ControlState | undefined,
    field?: FieldState<Record<string, unknown>, string>
  ) {
    this.#ref = props.ref;
    this.#id = props.id;
    this.control = control;
    this.field = field;

    if (control) {
      control.labelId = this.#id;
    }

    useRefById({
      id: this.#id,
      ref: this.#ref
    });
  }

  get props(): LabelAttrs {
    if (this.control) {
      return this.control.labelProps;
    }
    const field = this.field!;
    return {
      'data-fs-error': getDataFsError(field.errors),
      'data-fs-label': '',
      for: field.controlId,
      id: this.#id.current
    };
  }
}

type LegendStateProps = WithRefProps;

class LegendState {
  #ref: LegendStateProps['ref'];
  #id: LegendStateProps['id'];
  field: FieldState<Record<string, unknown>, string>;

  constructor(props: LegendStateProps, field: FieldState<Record<string, unknown>, string>) {
    this.#ref = props.ref;
    this.#id = props.id;
    this.field = field;

    useRefById({
      id: this.#id,
      ref: this.#ref
    });
  }

  props = $derived.by(
    () =>
      ({
        'data-fs-error': getDataFsError(this.field.errors),
        'data-fs-legend': '',
        id: this.#id.current
      }) as const
  );
}

const FORM_FIELD_CTX = Symbol.for('formsnap.form-field');
const FORM_CONTROL_CTX = Symbol.for('formsnap.form-control');

export function useField<T extends Record<string, unknown>, U extends FormPath<T>>(
  props: FormFieldStateProps<T, U>
) {
  return setContext(FORM_FIELD_CTX, new FormFieldState(props));
}

export function useElementField<T extends Record<string, unknown>, U extends FormPath<T>>(
  props: ElementFieldStateProps<T, U>
) {
  const formField = getField<T, U>();
  return setContext(FORM_FIELD_CTX, new ElementFieldState(props, formField));
}

export function getField<
  T extends Record<string, unknown> = Record<string, unknown>,
  U extends FormPath<T> = FormPath<T>
>() {
  return getContext<FieldState<T, U>>(FORM_FIELD_CTX);
}

export function useFieldErrors<
  T extends Record<string, unknown> = Record<string, unknown>,
  U extends FormPath<T> = FormPath<T>
>(props: FieldErrorsStateProps) {
  return new FieldErrorsState(props, getField<T, U>());
}

export function useDescription(props: DescriptionStateProps) {
  return new DescriptionState(props, getField());
}

export function useControl(props: ControlStateProps) {
  return setContext(FORM_CONTROL_CTX, new ControlState(props, getField()));
}

export function getFormControl2() {
  return getContext<ControlState>(FORM_CONTROL_CTX);
}

export function useLabel(props: LabelStateProps) {
  const control = hasContext(FORM_CONTROL_CTX)
    ? getContext<ControlState>(FORM_CONTROL_CTX)
    : undefined;
  const field = control ? undefined : getField();
  return new LabelState(props, control, field);
}

export function useLegend(props: LegendStateProps) {
  return new LegendState(props, getField());
}

// takes a string like "urls[0]" and returns ["urls", "0"]
// so we can access the specific array index properties
// since datatype: json is not supported with regular form
// submission, this should be fine
function splitArrayPath<T extends Record<string, unknown>>(name: string) {
  const [path, index] = name.split(/[[\]]/);
  return [path, index] as [FormPathArrays<T>, string];
}

export type UseFormFieldProps = {
  /** Optionally provide a function that returns the ID of the field errors container. */
  errorsId?: Getter<string | undefined | null>;
  /** Optionally provide a function that returns the ID of the description element. */
  descriptionId?: Getter<string | undefined | null>;
};

export function useFormField<
  T extends Record<string, unknown> = Record<string, unknown>,
  U extends FormPath<T> = FormPath<T>
>(props: UseFormFieldProps) {
  const fieldState = getContext<FieldState<T, U>>(FORM_FIELD_CTX);
  const form = fieldState.form;
  const errorsId = $derived(props.errorsId ? props.errorsId() : undefined);
  const descriptionId = $derived(props.descriptionId ? props.descriptionId() : undefined);

  useOnChange(
    () => errorsId,
    (v) => {
      if (v) {
        fieldState.errorId = v;
      }
    }
  );

  useOnChange(
    () => descriptionId,
    (v) => {
      if (v) {
        fieldState.descriptionId = v;
      }
    }
  );

  return {
    get constraints() {
      return fieldState.constraints;
    },
    get descriptionId() {
      return fieldState.descriptionId;
    },
    get errors() {
      return fieldState.errors;
    },
    get errorsId() {
      return fieldState.errorId;
    },
    form,
    get name() {
      return fieldState.name;
    },
    get tainted() {
      return fieldState.tainted;
    }
  };
}

export type UseFormControlProps = {
  /** Optionally provide a function that returns the ID of the control element. */
  id?: Getter<string | undefined | null>;
};

export function useFormControl(props: UseFormControlProps) {
  const controlState = getContext<ControlState>(FORM_CONTROL_CTX);
  const id = $derived(props.id ? props.id() : undefined);

  useOnChange(
    () => id,
    (v) => {
      if (v) {
        controlState.id = v;
      }
    }
  );

  return {
    get id() {
      return controlState.id;
    },
    get labelProps() {
      return controlState.labelProps;
    },
    get props() {
      return controlState.props;
    }
  };
}
