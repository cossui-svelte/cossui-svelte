<script lang="ts">
  import { PinInput as OTPFieldPrimitive } from "bits-ui";
  import { cn } from "$lib/utils";

  let {
    ref = $bindable(null),
    cell,
    class: className,
    placeholder,
    mask = false,
    ...restProps
  }: OTPFieldPrimitive.CellProps & {
    placeholder?: string;
    mask?: boolean;
  } = $props();
</script>

<OTPFieldPrimitive.Cell
  {cell}
  bind:ref
  data-slot="otp-field-input"
  class={cn(
    "relative inline-flex size-9 items-center justify-center rounded-lg border border-input bg-background not-dark:bg-clip-padding text-base text-foreground shadow-xs/5 outline-none ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-data-active:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] aria-invalid:border-destructive/36 data-active:z-10 data-active:border-ring data-active:ring-[3px] data-active:ring-ring/24 data-active:aria-invalid:border-destructive/64 data-active:aria-invalid:ring-destructive/16 in-[[data-slot=otp-field][data-size=lg]]:size-10 in-[[data-slot=otp-field][data-size=lg]]:text-lg sm:size-8 sm:text-sm sm:in-[[data-slot=otp-field][data-size=lg]]:size-9 sm:in-[[data-slot=otp-field][data-size=lg]]:text-base dark:bg-input/32 dark:not-data-active:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)] dark:data-active:aria-invalid:ring-destructive/24 [[data-active],[aria-invalid]]:shadow-none",
    className,
  )}
  {...restProps}
>
  {#if cell.char}
    {mask ? "•" : cell.char}
  {:else if placeholder && !cell.isActive}
    <span class="text-muted-foreground">{placeholder}</span>
  {/if}
  {#if cell.hasFakeCaret}
    <div
      class="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <div class="h-4 w-px animate-caret-blink bg-foreground"></div>
    </div>
  {/if}
</OTPFieldPrimitive.Cell>
