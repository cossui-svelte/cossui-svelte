import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { userSchema } from './schema';

export const load = async () => {
  const form = await superValidate(valibot(userSchema));
  return { form };
};

export const actions: Actions = {
  default: async ({ request }) => {

    const form = await superValidate(request, valibot(userSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    if (form.data.password !== form.data.confirmPassword) {
      return setError(form, 'confirmPassword', "Passwords don't match");
    }

    // All data is valid — do your thing (DB insert, auth, etc.)
    console.log('Valid data:', form.data);

    return { form };
  }
};
