<script lang="ts">
  import { PinInput as OTPFieldPrimitive } from "bits-ui";
  import { cn } from "$lib/utils";

  let {
    ref = $bindable(null),
    class: className,
    value = $bindable(""),
    size = "default",
    ...restProps
  }: OTPFieldPrimitive.RootProps & {
    size?: "default" | "lg";
  } = $props();
</script>

<OTPFieldPrimitive.Root
  bind:ref
  bind:value
  data-slot="otp-field"
  data-size={size}
  spellcheck={false}
  class={cn(
    "flex items-center gap-2 has-disabled:opacity-64 has-disabled:**:data-[slot=otp-field-input]:shadow-none has-disabled:**:data-[slot=otp-field-input]:before:shadow-none!",
    className,
  )}
  {...restProps}
/>
