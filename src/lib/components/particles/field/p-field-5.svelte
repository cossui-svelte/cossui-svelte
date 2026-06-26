<script lang="ts">
  import { Field, FieldLabel } from '$lib/components/ui/field';
  import { Input } from '$lib/components/ui/input';

  let inputEl = $state<HTMLInputElement | null>(null);
  let validity = $state<Record<string, unknown> | null>(null);

  function captureValidity() {
    const v = inputEl?.validity;
    if (!v) return;
    validity = {
      badInput: v.badInput,
      customError: v.customError,
      error: v.valid ? undefined : inputEl?.validationMessage,
      patternMismatch: v.patternMismatch,
      rangeOverflow: v.rangeOverflow,
      rangeUnderflow: v.rangeUnderflow,
      stepMismatch: v.stepMismatch,
      tooLong: v.tooLong,
      tooShort: v.tooShort,
      typeMismatch: v.typeMismatch,
      valid: v.valid,
      valueMissing: v.valueMissing,
    };
  }
</script>

<Field name="email">
  <FieldLabel>Email</FieldLabel>
  <Input
    bind:ref={inputEl}
    onchange={captureValidity}
    oninput={captureValidity}
    placeholder="Enter your email"
    required
    type="email"
  />
  {#if validity}
    <div class="flex w-full flex-col gap-2">
      {#if !validity.valid}
        <p class="text-destructive-foreground text-xs">{validity.error}</p>
      {/if}
      <div class="w-full rounded-md bg-muted p-2">
        <pre class="max-h-60 overflow-y-auto font-mono text-xs scrollbar-none">{JSON.stringify(validity, null, 2)}</pre>
      </div>
    </div>
  {/if}
</Field>
