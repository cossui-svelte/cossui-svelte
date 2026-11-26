<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';
  import {
    type ComposerItemValue,
    useComposerSuggestionsContext
  } from './composer-editor.svelte.js';

  type Props = Omit<HTMLButtonAttributes, 'value'> & {
    ref?: HTMLButtonElement | null;
    value?: ComposerItemValue;
    children?: Snippet<[{ highlighted: boolean; disabled: boolean }]>;
  };

  let {
    ref = $bindable(null),
    class: className,
    value,
    disabled: disabledProp,
    children,
    onpointermove,
    onclick,
    onmousedown,
    ...restProps
  }: Props = $props();

  const suggestions = useComposerSuggestionsContext();

  const disabled = $derived(Boolean(disabledProp || value?.disabled));
  const id = $derived(value?.id);
  const highlighted = $derived(id !== undefined && id === suggestions?.highlightedId);

  function register(element: HTMLElement) {
    const itemId = id;
    const isDisabled = disabled;
    if (itemId === undefined || !suggestions) return;
    suggestions.registerItem(itemId, { element, disabled: isDisabled });
    return () => suggestions.registerItem(itemId, null);
  }
</script>

<button
  bind:this={ref}
  {@attach register}
  type="button"
  data-slot="composer-item"
  id={id !== undefined && suggestions
    ? `${suggestions.listId}-${encodeURIComponent(id)}`
    : undefined}
  role={suggestions ? 'option' : undefined}
  tabindex={suggestions ? -1 : undefined}
  aria-selected={suggestions ? highlighted : undefined}
  aria-disabled={disabled || undefined}
  data-highlighted={highlighted ? '' : undefined}
  data-disabled={disabled ? '' : undefined}
  {disabled}
  class={cn(
    'flex min-h-8 w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-start text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm',
    className
  )}
  onpointermove={(event) => {
    onpointermove?.(event);
    if (!event.defaultPrevented && !disabled && value) suggestions?.highlightItem(value);
  }}
  onclick={(event) => {
    onclick?.(event);
    // `preventDefault()` in the caller's handler skips the default selection.
    if (!event.defaultPrevented && !disabled && value) suggestions?.selectItem(value);
  }}
  onmousedown={(event) => {
    onmousedown?.(event);
    if (suggestions) event.preventDefault();
  }}
  {...restProps}
>
  {@render children?.({ highlighted, disabled })}
</button>
