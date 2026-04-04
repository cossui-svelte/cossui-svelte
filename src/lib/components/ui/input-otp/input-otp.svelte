<script lang="ts">
  import { PinInput as InputOTPPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    value = $bindable(""),
    ...restProps
  }: InputOTPPrimitive.RootProps = $props();
</script>

<InputOTPPrimitive.Root
  bind:ref
  bind:value
  data-slot="input-otp"
  spellcheck={false}
  class={cn(
    "flex items-center gap-2 has-disabled:opacity-64 has-disabled:**:data-[slot=input-otp-slot]:shadow-none has-disabled:**:data-[slot=input-otp-slot]:before:shadow-none!",
    className,
  )}
  {...restProps}
/>
