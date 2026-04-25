import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { userSchema } from './schema';

export const load = async () => {
  const form = await superValidate(valibot(userSchema));
  return { form };
};
