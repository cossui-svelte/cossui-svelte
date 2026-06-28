import * as v from 'valibot';

export const schema = v.pipe(
  v.object({
    email: v.pipe(v.string(), v.email('Please enter a valid email'))
  })
);
