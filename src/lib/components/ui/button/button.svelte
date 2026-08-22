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

  const isDisabled = $derived(Boolean(loading || disabled));
</script>

{#if href}
  <!-- eslint-disable svelte/no-navigation-without-resolve -- href is caller-supplied; the caller resolves the route, not this generic button primitive -->
  <a
    bind:this={ref}
    class={cn(buttonVariants({ size, variant }), className)}
    data-slot="button"
    data-loading={loading ? '' : undefined}
    href={isDisabled ? undefined : href}
    aria-disabled={isDisabled ? true : undefined}
    role={isDisabled ? 'link' : undefined}
    tabindex={isDisabled ? -1 : undefined}
    {...restProps as HTMLAnchorAttributes}
  >
    {@render children?.()}
    {#if loading === true}
      <Spinner class="pointer-events-none absolute" data-slot="button-loading-indicator" />
    {/if}
  </a>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
{:else}
  <ButtonPrimitive
    bind:ref
    disabled={isDisabled}
    class={cn(buttonVariants({ size, variant }), className)}
    data-slot="button"
    data-loading={loading ? '' : undefined}
    aria-disabled={loading || undefined}
    {...restProps as unknown as ComponentProps<typeof ButtonPrimitive>}
  >
    {@render children?.()}
    {#if loading === true}
      <Spinner class="pointer-events-none absolute" data-slot="button-loading-indicator" />
    {/if}
  </ButtonPrimitive>
{/if}
