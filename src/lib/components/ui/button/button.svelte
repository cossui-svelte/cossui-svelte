<script lang="ts">
  import { Button as ButtonPrimitive } from '@shardsui/svelte/button';
  import type { ComponentProps, Snippet } from 'svelte';
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
  import { Spinner } from '$lib/components/ui/spinner';
  import { cn } from '$lib/utils';
  import { type ButtonSize, type ButtonVariant, buttonVariants } from './button-variants';

  type ButtonElementProps = HTMLButtonAttributes & { href?: never };
  type AnchorElementProps = Omit<HTMLAnchorAttributes, 'type'> & {
    type?: never;
    disabled?: HTMLButtonAttributes['disabled'];
  };

  let {
    ref = $bindable(null),
    class: className,
    variant,
    size,
    children,
    loading,
    href,
    disabled,
    ...restProps
  }: (ButtonElementProps | AnchorElementProps) & {
    ref?: HTMLElement | null;
    variant?: ButtonVariant;
    size?: ButtonSize;
    class?: string;
    children?: Snippet;
    loading?: boolean;
  } = $props();
</script>

{#if href}
  <!-- eslint-disable svelte/no-navigation-without-resolve -- href is caller-supplied; the caller resolves the route, not this generic button primitive -->
  <a
    bind:this={ref}
    class={cn(buttonVariants({ size, variant }), className)}
    data-slot="button"
    href={disabled ? undefined : href}
    aria-disabled={disabled ? true : undefined}
    role={disabled ? 'link' : undefined}
    tabindex={disabled ? -1 : undefined}
    {...restProps as HTMLAnchorAttributes}
  >
    {#if loading === true}
      <Spinner /> {@render children?.()}
    {:else}
      {@render children?.()}
    {/if}
  </a>
  <!-- eslint-enable svelte/no-navigation-without-resolve -->
{:else}
  <ButtonPrimitive
    bind:ref
    disabled={disabled ?? undefined}
    class={cn(buttonVariants({ size, variant }), className)}
    data-slot="button"
    {...restProps as unknown as ComponentProps<typeof ButtonPrimitive>}
  >
    {#if loading === true}
      <Spinner /> {@render children?.()}
    {:else}
      {@render children?.()}
    {/if}
  </ButtonPrimitive>
{/if}
