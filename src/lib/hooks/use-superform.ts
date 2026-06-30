import { defaults, superForm } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { ZodType, z } from 'zod';
import { uid } from './use-uid';

type SchemaForm<TSchema extends ZodType> = {
  schema: TSchema;
  initialData?: Partial<z.output<TSchema>>;
  onUpdated?: (data: z.output<TSchema>) => void;
};

type ManualForm<T extends Record<string, unknown>> = {
  schema?: undefined;
  initialData: T;
  // form.data is unvalidated — caller decides what "valid" means
  onValidate?: (event: { form: { data: T }; cancel: () => void }) => void | Promise<void>;
  onUpdated?: (data: T) => void;
};

export function createForm<TSchema extends ZodType>(
  options: SchemaForm<TSchema>
): ReturnType<typeof superForm>;

export function createForm<T extends Record<string, unknown>>(
  options: ManualForm<T>
): ReturnType<typeof superForm>;

export function createForm(options: any) {
  if (options.schema) {
    return superForm(defaults(options.initialData, zod4(options.schema)), {
      id: uid(),
      onUpdate({ form }) {
        if (form.valid) options.onUpdated?.(form.data);
      },
      resetForm: false,
      SPA: true,
      validators: zod4(options.schema)
    });
  }

  // Manual mode: no validator, caller owns validity via onUpdate
  return superForm(defaults(options.initialData), {
    id: uid(),
    onUpdate: options.onUpdate ?? (({ form }) => options.onUpdated?.(form.data)),
    resetForm: false,
    SPA: true,
    validators: undefined
  });
}
