# Field — Svelte 5

Headless, accessible form-field primitive for Svelte 5. A port of the
[Base UI Field](https://base-ui.com/react/components/field) React component.

## Parts

| Component          | Element  | Description                                             |
| ------------------ | -------- | ------------------------------------------------------- |
| `Field.Root`       | `<div>`  | Container that provides context to all child parts.     |
| `Field.Control`    | `<input>`| The form control; drives dirty/filled/focused state.    |
| `Field.Label`      | `<label>`| Auto-associated label (`for` ↔ `aria-labelledby`).      |
| `Field.Description`| `<p>`    | Helper text added to `aria-describedby` automatically.  |
| `Field.Error`      | `<div>`  | Error message shown when validation fails.              |
| `Field.Validity`   | —        | Render-prop (snippet) exposing the full validity state. |
| `Field.Item`       | `<div>`  | Groups an item in a checkbox / radio group.             |

## Installation

```bash
# Once a Svelte package is published:
npm install @base-ui/svelte
```

For now, copy the `packages/svelte/src/field/` directory into your project.

## Basic usage

```svelte
<script lang="ts">
  import * as Field from '$lib/field/index.js';
</script>

<Field.Root name="email">
  <Field.Label>Email</Field.Label>
  <Field.Control type="email" required />
  <Field.Description>We will never share your email.</Field.Description>
  <Field.Error />
</Field.Root>
```

## Custom validation

```svelte
<script lang="ts">
  import * as Field from '$lib/field/index.js';

  function validateEmail(value: unknown) {
    if (!value) return 'Email is required.';
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(String(value))) return 'Invalid email.';
    return null;
  }
</script>

<Field.Root name="email" validate={validateEmail} validationMode="onBlur">
  <Field.Label>Email</Field.Label>
  <Field.Control type="email" />
  <Field.Error />
</Field.Root>
```

## Controlled value

```svelte
<script lang="ts">
  import * as Field from '$lib/field/index.js';
  let email = $state('');
</script>

<Field.Root name="email">
  <Field.Label>Email</Field.Label>
  <Field.Control
    type="email"
    value={email}
    onValueChange={(v) => (email = v)}
  />
  <Field.Error />
</Field.Root>

<p>Current value: {email}</p>
```

## Async validation

```svelte
<script lang="ts">
  import * as Field from '$lib/field/index.js';

  async function checkUsername(value: unknown) {
    const res = await fetch(`/api/check-username?name=${value}`);
    const { taken } = await res.json();
    return taken ? 'Username is already taken.' : null;
  }
</script>

<Field.Root
  name="username"
  validate={checkUsername}
  validationMode="onChange"
  validationDebounceTime={400}
>
  <Field.Label>Username</Field.Label>
  <Field.Control />
  <Field.Error />
</Field.Root>
```

## Multiple errors (custom validate)

```svelte
<script lang="ts">
  import * as Field from '$lib/field/index.js';

  function validatePassword(value: unknown) {
    const errors: string[] = [];
    const s = String(value ?? '');
    if (s.length < 8) errors.push('At least 8 characters.');
    if (!/[A-Z]/.test(s)) errors.push('At least one uppercase letter.');
    if (!/[0-9]/.test(s)) errors.push('At least one digit.');
    return errors.length > 0 ? errors : null;
  }
</script>

<Field.Root name="password" validate={validatePassword} validationMode="onBlur">
  <Field.Label>Password</Field.Label>
  <Field.Control type="password" />
  <!-- renders a <ul> list when there are multiple errors -->
  <Field.Error />
</Field.Root>
```

## Showing specific native errors

```svelte
<Field.Root name="age">
  <Field.Label>Age</Field.Label>
  <Field.Control type="number" min="0" max="120" />
  <!-- Only shown when the value is above `max` -->
  <Field.Error match="rangeOverflow">Value must be 120 or less.</Field.Error>
  <!-- Only shown when the value is below `min` -->
  <Field.Error match="rangeUnderflow">Value must be 0 or more.</Field.Error>
  <!-- Shown for any other validation error -->
  <Field.Error />
</Field.Root>
```

## Custom validity display with `Field.Validity`

```svelte
<script lang="ts">
  import * as Field from '$lib/field/index.js';
</script>

<Field.Root name="code">
  <Field.Label>Promo code</Field.Label>
  <Field.Control />

  <Field.Validity>
    {#snippet children(validity)}
      {#if validity.validity.valid === true}
        <span class="ok">✓ Valid code</span>
      {:else if validity.validity.valid === false}
        <span class="err">✗ {validity.error}</span>
      {/if}
    {/snippet}
  </Field.Validity>
</Field.Root>
```

## Externally-controlled state

```svelte
<script lang="ts">
  import * as Field from '$lib/field/index.js';

  // managed by a form library such as Superforms
  let touched = $state(false);
  let dirty = $state(false);
  let invalid = $state(false);
</script>

<Field.Root name="field" {touched} {dirty} {invalid}>
  <Field.Label>Field</Field.Label>
  <Field.Control />
  <Field.Error match={true}>External error</Field.Error>
</Field.Root>
```

## CSS data attributes

All parts receive `data-*` attributes reflecting the current field state so you
can style them without JavaScript:

| Attribute       | Description                                  |
| --------------- | -------------------------------------------- |
| `data-disabled` | Field (or item) is disabled.                 |
| `data-touched`  | Control has lost focus at least once.        |
| `data-dirty`    | Value has changed from the initial value.    |
| `data-filled`   | Control has a non-empty value.               |
| `data-focused`  | Control is currently focused.                |
| `data-valid`    | Field passed all validations.                |
| `data-invalid`  | Field failed at least one validation.        |

`Field.Error` additionally exposes:

| Attribute       | Description                                  |
| --------------- | -------------------------------------------- |
| `data-entering` | Present for one animation frame on mount.    |
| `data-exiting`  | Present while a CSS exit transition plays.   |

### Example CSS

```css
/* Highlight invalid controls */
[data-invalid] input {
  border-color: red;
}

/* Fade-in error message */
[data-entering] {
  animation: fade-in 150ms ease-out;
}

/* Fade-out on dismiss */
[data-exiting] {
  animation: fade-out 150ms ease-in;
}
```

## Context API (advanced)

The context object exposed by `Field.Root` is available via Svelte's
`getContext` using the `FIELD_CONTEXT_KEY` symbol exported from `context.ts`.
This lets you build custom field-part components that interact with the same
validation pipeline.

```svelte
<script lang="ts">
  import { getContext } from 'svelte';
  import { FIELD_CONTEXT_KEY, type FieldContext } from '$lib/field/context.js';

  const ctx = getContext<FieldContext>(FIELD_CONTEXT_KEY);

  function validateNow() {
    ctx?.commit(ctx.validityData.value);
  }
</script>

<button onclick={validateNow}>Validate now</button>
```

## React ↔ Svelte 5 mapping

| React concept                  | Svelte 5 equivalent                              |
| ------------------------------ | ------------------------------------------------ |
| `React.createContext`          | `setContext` / `getContext` with a `Symbol` key  |
| `useContext`                   | `getContext`                                     |
| `useState` / `useReducer`      | `$state` rune                                    |
| `useMemo` / `useCallback`      | `$derived` rune                                  |
| `useEffect` / `useLayoutEffect`| `$effect` rune                                   |
| `React.forwardRef`             | `bind:this` on the element in the component      |
| Render prop (`children` as fn) | Svelte snippet with parameters `{#snippet f(x)}` |
| `useImperativeHandle`          | Exported functions / `$bindable` props           |
