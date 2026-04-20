import * as v from 'valibot';

export const userSchema = v.pipe(v.object({
  name: v.pipe(v.string(), v.minLength(10, 'Name must be at least 10 characters')),
  email: v.pipe(v.string(), v.email('Please enter a valid email')),
  age: v.pipe(v.number('Age must be a number'), v.integer(), v.minValue(18, 'Must be 18 or older')),
  password: v.pipe(v.string(), v.minLength(8, 'Password must be at least 8 characters')),
  confirmPassword: v.string()
}),
  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      (input) => input.password === input.confirmPassword,
      "Passwords do not match"
    ),
    ["confirmPassword"]
  )
);

export type UserSchema = v.InferOutput<typeof userSchema>

