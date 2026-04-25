import * as v from 'valibot';

export const userSchema = v.object({
  email: v.pipe(v.string(), v.email('Please enter a valid email'))
});
