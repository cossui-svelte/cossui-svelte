import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from '../$types';
import { signupFormSchema } from './schema';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod4(signupFormSchema))
  };
};
