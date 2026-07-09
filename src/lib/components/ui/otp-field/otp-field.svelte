<script lang="ts">
  import { PinInput as OTPFieldPrimitive } from "bits-ui";
  import { cn } from "$lib/utils";

  let {
    ref = $bindable(null),
    class: className,
    value = $bindable(""),
    size = "default",
    ...restProps
  }: Omit<OTPFieldPrimitive.RootProps, "size"> & {
    size?: "default" | "lg";
  } = $props();
</script>

<div data-slot="otp-field" data-size={size}>
  <OTPFieldPrimitive.Root
    bind:ref
    bind:value
    spellcheck={false}
    class={cn(
      "flex items-center gap-2 has-disabled:opacity-64 has-disabled:**:data-[slot=otp-field-input]:shadow-none has-disabled:**:data-[slot=otp-field-input]:before:shadow-none!",
      className,
    )}
    {...restProps}
  />
</div>
