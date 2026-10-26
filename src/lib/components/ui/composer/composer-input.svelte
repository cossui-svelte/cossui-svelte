<script lang="ts">
  import { mount, type Snippet, unmount, untrack } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { ScrollArea } from '#lib/components/ui/scroll-area/index.js';
  import { cn } from '#lib/utils.js';
  import {
    type ComposerTokenPart,
    useComposerEditorContext,
    useComposerSuggestionsContext
  } from './composer-editor.svelte.js';
  import ComposerTokenHost from './composer-token-host.svelte';

  type Props = Omit<HTMLAttributes<HTMLElement>, 'contenteditable'> & {
    ref?: HTMLElement | null;
    /** Render a native `<textarea>` instead of a contenteditable `<div>`. */
    as?: 'div' | 'textarea';
    placeholder?: string;
    renderToken?: Snippet<[ComposerTokenPart]>;
  };

  let {
    ref = $bindable(null),
    as: tag = 'div',
    class: className,
    placeholder,
    renderToken,
    ...restProps
  }: Props = $props();

  const editor = useComposerEditorContext();
  const suggestions = useComposerSuggestionsContext();

  const textarea = $derived(tag === 'textarea');

  type Handlers = Record<string, ((event: never) => void) | undefined>;
  const user = (key: string) => (restProps as Handlers)[key];
  const own: Handlers = { ...editor?.handlers };

  // Run the caller's handler first, then suggestions, then the editor (right-to-left merge).
  const handlers: Handlers = {};
  for (const key of Object.keys(own)) {
    handlers[key] = (event: never) => {
      user(key)?.(event);
      if (key === 'onkeydown' && !textarea) suggestions?.onKeyDown(event as KeyboardEvent);
      own[key]?.(event);
    };
  }

  const attributes = $derived(
    textarea
      ? { disabled: editor?.disabled, readonly: editor?.readOnly, placeholder }
      : {
          ...editor?.inputAttributes,
          ...suggestions?.inputAttributes,
          contenteditable: editor?.inputAttributes.contenteditable ?? true
        }
  );

  // --- layout: line height measurement + adaptive single/multi-line switch ---
  let scrollElement = $state<HTMLElement | null>(null);
  let scheduleMeasure: (() => void) | null = null;

  $effect(() => {
    const scroll = scrollElement;
    const input = editor?.inputElement;
    if (!scroll || !input) return;
    const frame = scroll.closest<HTMLElement>('[data-slot="composer"]');
    // eslint-disable-next-line svelte/prefer-svelte-reactivity -- local to the effect, not reactive state
    const controls = new Set<HTMLElement>();
    let animationFrame: number | null = null;

    function schedule(): void {
      if (animationFrame !== null) return;
      animationFrame = requestAnimationFrame(() => {
        animationFrame = null;
        measure();
      });
    }

    const observer = new ResizeObserver(schedule);

    function measure(): void {
      if (!scroll || !input) return;
      // Observe the groups themselves: their wrapper has no box in compact mode.
      const nextControls = new Set(
        frame?.querySelectorAll<HTMLElement>(
          ':scope > [data-slot="composer-actions"] > [data-slot="composer-action-group"]'
        )
      );
      for (const control of controls) {
        if (!nextControls.has(control)) {
          observer.unobserve(control);
          controls.delete(control);
        }
      }
      for (const control of nextControls) {
        if (!controls.has(control)) {
          observer.observe(control);
          controls.add(control);
        }
      }
      const style = getComputedStyle(input);
      const lineHeight =
        Number.parseFloat(style.lineHeight) || Number.parseFloat(style.fontSize) * 1.2;
      const padding = Number.parseFloat(style.paddingTop) + Number.parseFloat(style.paddingBottom);
      for (const [property, value] of [
        ['--composer-line-height', `${lineHeight}px`],
        ['--composer-input-padding', `${padding}px`]
      ] as const) {
        if (scroll.style.getPropertyValue(property) !== value) {
          scroll.style.setProperty(property, value);
        }
      }
      if (!frame || frame.dataset.layout !== 'adaptive' || !controls.size) {
        frame?.removeAttribute('data-multiline');
        return;
      }
      const minRows = Number.parseFloat(style.getPropertyValue('--composer-min-rows'));
      if (minRows > 1) {
        frame.toggleAttribute('data-multiline', true);
        return;
      }

      // Measure at the narrow, one-line width even after the actions move below.
      // This keeps the layout from oscillating when full-width text fits one line.
      frame.removeAttribute('data-multiline');
      const minHeight = input.style.getPropertyValue('min-height');
      const minHeightPriority = input.style.getPropertyPriority('min-height');
      input.style.setProperty('min-height', '0px', 'important');
      const contentHeight = input.scrollHeight;
      if (minHeight) {
        input.style.setProperty('min-height', minHeight, minHeightPriority);
      } else {
        input.style.removeProperty('min-height');
      }
      frame.toggleAttribute('data-multiline', contentHeight > lineHeight * 1.5 + padding);
    }

    scheduleMeasure = schedule;
    measure();
    observer.observe(input);
    if (frame) observer.observe(frame);
    input.addEventListener('input', schedule);
    window.addEventListener('resize', schedule);
    document.fonts.addEventListener('loadingdone', schedule);
    return () => {
      scheduleMeasure = null;
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      observer.disconnect();
      input.removeEventListener('input', schedule);
      window.removeEventListener('resize', schedule);
      document.fonts.removeEventListener('loadingdone', schedule);
    };
  });

  // Controlled drafts, layout props and conditional actions can change without an input event.
  $effect(() => {
    void editor?.value;
    void editor?.disabled;
    void className;
    scheduleMeasure?.();
  });

  // --- tokens: mount the token renderer into each host span inside the editable ---
  // eslint-disable-next-line svelte/prefer-svelte-reactivity -- bookkeeping for mounted token hosts, intentionally non-reactive
  const mounted = new Map<HTMLElement, Record<string, unknown>>();

  function readToken(node: HTMLElement): ComposerTokenPart {
    return {
      type: node.dataset.composerToken === 'action' ? 'action' : 'mention',
      id: node.dataset.id ?? '',
      label: node.dataset.label ?? '',
      trigger: node.dataset.trigger ?? '@',
      ...(node.dataset.kind ? { kind: node.dataset.kind } : {}),
      ...(node.dataset.data !== undefined ? { data: node.dataset.data } : {}),
      ...(node.dataset.text !== undefined ? { text: node.dataset.text } : {})
    };
  }

  $effect(() => {
    const hosts = editor?.tokenHosts ?? [];
    untrack(() => {
      for (const host of hosts) {
        if (mounted.has(host)) continue;
        const node = host.parentElement;
        if (!node) continue;
        const fallback = host.previousElementSibling;
        if (fallback instanceof HTMLElement) fallback.hidden = true;
        const token = readToken(node);
        mounted.set(
          host,
          mount(ComposerTokenHost, {
            target: host,
            props: {
              token,
              get renderToken() {
                return renderToken;
              }
            }
          })
        );
      }
      for (const [host, instance] of mounted) {
        if (hosts.includes(host)) continue;
        void unmount(instance);
        mounted.delete(host);
      }
    });
  });

  $effect(() => () => {
    for (const instance of mounted.values()) void unmount(instance);
    mounted.clear();
  });
</script>

<!-- The drawer reserves keyboard space; its nested input scroller needs no extra bottom padding. -->
<ScrollArea
  bind:ref={scrollElement}
  class="in-[[data-layout=adaptive][data-multiline]]:col-span-full in-[[data-layout=adaptive][data-multiline]]:col-start-1 in-data-[layout=adaptive]:col-start-2 in-data-[layout=adaptive]:row-start-1 flex h-auto! min-h-0 min-w-0 flex-col in-[[data-layout=adaptive][data-multiline]]:self-stretch in-[[data-layout=adaptive]:not([data-multiline])]:rounded-none rounded-t-[inherit] text-base [--composer-scroll-padding:var(--composer-padding)] in-[[data-layout=adaptive]:not([data-multiline])]:[--composer-scroll-padding:0px] **:data-[slot=scroll-area-viewport]:h-auto! **:data-[slot=scroll-area-viewport]:max-h-[min(var(--composer-max-height,calc(var(--composer-max-rows,8)*var(--composer-line-height,1lh)+var(--composer-input-padding,--spacing(2))+var(--composer-scroll-padding))),50dvh)] **:data-[slot=scroll-area-viewport]:min-h-0 **:data-[slot=scroll-area-content]:pt-[max(0px,calc(var(--composer-scroll-padding)-1px))] **:data-[slot=scroll-area-viewport]:pb-0! md:text-sm"
  data-slot="composer-scroll-area"
  overscrollContain
  scrollFade
>
  <svelte:element
    this={tag}
    bind:this={
      () => editor?.inputElement ?? ref,
      (element) => {
        if (editor) editor.inputElement = element;
        ref = element;
      }
    }
    data-slot="composer-input"
    data-empty={!textarea && editor?.isEmpty && !editor.isComposing ? '' : undefined}
    data-placeholder={placeholder}
    aria-placeholder={editor ? placeholder : undefined}
    class={cn(
      'field-sizing-content wrap-anywhere relative block min-h-[calc(var(--composer-min-rows,1)*1lh+--spacing(2))] w-full min-w-0 resize-none whitespace-pre-wrap border-0 bg-transparent in-[[data-layout=adaptive]:not([data-multiline])]:px-1 px-[calc(--spacing(3)-1px)] py-1 outline-none placeholder:text-muted-foreground/72 data-empty:before:pointer-events-none data-empty:before:absolute data-empty:before:text-muted-foreground/72 data-empty:before:content-[attr(data-placeholder)] md:in-data-[layout=adaptive]:min-h-[calc(var(--composer-min-rows,1)*1lh+--spacing(2))] md:min-h-[calc(var(--composer-min-rows,2)*1lh+--spacing(2))]',
      className
    )}
    {...restProps}
    {...attributes}
    {...handlers}
  ></svelte:element>
</ScrollArea>
