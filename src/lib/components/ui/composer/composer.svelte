<script lang="ts">
  import { Popover as PopoverPrimitive } from '@shardsui/svelte/popover';
  import type { Snippet } from 'svelte';
  import type { HTMLFormAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';
  import {
    type ComposerChangeDetails,
    ComposerEditor,
    type ComposerEditorOptions,
    type ComposerItemValue,
    type ComposerQuery,
    ComposerSuggestions,
    type ComposerTrigger,
    type ComposerValue,
    focusComposerInput,
    getComposerText,
    setComposerEditorContext,
    setComposerSuggestionsContext
  } from './composer-editor.svelte.js';

  type Props = Omit<HTMLFormAttributes, 'onsubmit' | 'name' | 'children'> & {
    ref?: HTMLFormElement | null;
    layout?: 'stacked' | 'adaptive';
    value?: ComposerValue;
    defaultValue?: ComposerValue;
    onValueChange?: (value: ComposerValue, details: ComposerChangeDetails) => void;
    onSubmit?: (value: ComposerValue) => void;
    onQueryChange?: (query: ComposerQuery | null) => void;
    onAction?: (item: ComposerItemValue, query: ComposerQuery) => void;
    submitOnEmptySuggestions?: boolean;
    triggers?: readonly ComposerTrigger[];
    disabled?: boolean;
    readOnly?: boolean;
    submitDisabled?: boolean;
    allowEmpty?: boolean;
    submitOnEnter?: ComposerEditorOptions['submitOnEnter'];
    name?: string;
    getSuggestionsAnnouncement?: (count: number) => string;
    /** Receives the editor state, so descendants can call `insertTrigger`, `reset`, ... */
    children?: Snippet<[ComposerEditor]>;
  };

  let {
    ref = $bindable(null),
    class: className,
    layout = 'stacked',
    value = $bindable(),
    defaultValue = [],
    onValueChange,
    onSubmit,
    onQueryChange,
    onAction,
    submitOnEmptySuggestions,
    triggers,
    disabled,
    readOnly,
    submitDisabled,
    allowEmpty,
    submitOnEnter,
    name,
    getSuggestionsAnnouncement,
    children,
    ...restProps
  }: Props = $props();

  const listId = $props.id();

  // Uncontrolled drafts live here; a bound/passed `value` takes precedence.
  // svelte-ignore state_referenced_locally
  let uncontrolled = $state.raw<ComposerValue>(defaultValue);

  const editor = new ComposerEditor(() => ({
    value: value ?? uncontrolled,
    defaultValue,
    onValueChange: (next, details) => {
      uncontrolled = next;
      value = next;
      onValueChange?.(next, details);
    },
    onSubmit,
    onQueryChange,
    onAction,
    submitOnEmptySuggestions,
    triggers,
    disabled,
    readOnly,
    submitDisabled,
    allowEmpty,
    submitOnEnter
  }));

  const suggestions = new ComposerSuggestions(() => ({
    ...editor.suggestions,
    listId,
    getSuggestionsAnnouncement
  }));

  setComposerEditorContext(editor);
  setComposerSuggestionsContext(suggestions);

  // Native `form.reset()` restores the default draft.
  $effect(() => {
    const form = editor.rootElement;
    if (!form) return;
    const onReset = (event: Event) => {
      queueMicrotask(() => {
        if (!event.defaultPrevented) editor.reset();
      });
    };
    form.addEventListener('reset', onReset);
    return () => form.removeEventListener('reset', onReset);
  });
</script>

<PopoverPrimitive.Root open={suggestions.open} onOpenChange={suggestions.onOpenChange}>
  <form
    bind:this={
      () => editor.rootElement,
      (element) => {
        editor.rootElement = element;
        ref = element;
      }
    }
    data-slot="composer"
    data-layout={layout}
    data-base-ui-swipe-ignore=""
    data-disabled={editor.disabled ? '' : undefined}
    data-readonly={editor.readOnly ? '' : undefined}
    class={cn(
      'relative flex min-h-0 min-w-0 cursor-text flex-col data-disabled:cursor-default rounded-(--composer-radius) border border-input bg-background not-dark:bg-clip-padding pb-[calc(var(--composer-padding)-1px)] text-foreground shadow-xs/5 ring-ring/24 transition-shadow [--composer-radius:var(--radius-xl)] [--composer-max-rows:4] [--composer-padding:--spacing(2)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--composer-radius)-1px)] not-data-disabled:not-has-[[data-slot=composer-input]:focus-visible]:not-has-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] has-[[data-slot=composer-input]:focus-visible]:has-aria-invalid:border-destructive/64 has-[[data-slot=composer-input]:focus-visible]:has-aria-invalid:ring-destructive/16 has-[[data-slot=composer-input]:focus-visible]:border-ring has-aria-invalid:border-destructive/36 has-[[data-slot=composer-input]:focus-visible]:shadow-none has-aria-invalid:shadow-none has-[[data-slot=composer-input]:focus-visible]:ring-[3px] aria-invalid:border-destructive/36 aria-invalid:shadow-none data-disabled:opacity-64 data-disabled:shadow-none dark:bg-input/32 dark:aria-invalid:ring-destructive/24 dark:has-aria-invalid:ring-destructive/24 dark:not-data-disabled:not-has-[[data-slot=composer-input]:focus-visible]:not-has-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)] md:[--composer-max-rows:8]',
      'data-[layout=adaptive]:data-multiline:grid-rows-[minmax(0,1fr)_auto] data-[layout=adaptive]:grid data-[layout=adaptive]:grid-cols-[auto_minmax(0,1fr)_auto] data-[layout=adaptive]:items-center data-[layout=adaptive]:not-data-multiline:px-[calc(--spacing(2)-1px)] data-[layout=adaptive]:not-data-multiline:pt-[calc(var(--composer-padding)-1px)]',
      className
    )}
    onmousedown={(event) => focusComposerInput(event, true)}
    onclick={(event) => focusComposerInput(event, false)}
    onsubmit={editor.onFormSubmit}
    {...restProps}
  >
    {@render children?.(editor)}
    {#if name}
      <input
        type="hidden"
        {name}
        value={getComposerText(editor.value)}
        disabled={editor.disabled}
      />
    {/if}
  </form>
  <span
    class="absolute -m-px size-px overflow-hidden whitespace-nowrap p-0 [clip-path:inset(50%)]"
    role="status"
    aria-atomic="true">{suggestions.announcement}</span
  >
</PopoverPrimitive.Root>
