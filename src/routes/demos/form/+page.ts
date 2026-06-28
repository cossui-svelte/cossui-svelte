import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { schema } from './schema.js';

export const load = async () => {
  const form = await superValidate(valibot(schema));
  return { form };
};
