import * as v from 'valibot';

export const schema = v.pipe(
  v.object({
    name: v.pipe(v.string(), v.minLength(3, 'please enter a valid name')),
    username: v.pipe(v.string(), v.minLength(3, 'Username must be at least 3 characters long')),
  }),
);
