<script lang="ts">
  import { FieldErrors, type FieldErrorsProps } from "$lib/formsnap";
  import { cn, type WithElementRef } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children: childrenProp,
    ...restProps
  }: WithElementRef<FieldErrorsProps> = $props();
</script>

<FieldErrors {...restProps}>
  {#snippet child({ props, errors, errorProps })}
    <div
      bind:this={ref}
      {...props}
      data-slot="field-error"
      class={cn("text-destructive-foreground text-xs", className)}
    >
      {#if childrenProp}
        {@render childrenProp({ errors, errorProps })}
      {:else}
        {#each errors as error}
          <div {...errorProps}>{error}</div>
        {/each}
      {/if}
    </div>
  {/snippet}
</FieldErrors>
