<script lang="ts">

  /**
   * TabsIndicator.svelte — Svelte 5 port of TabsIndicator.tsx
   *
   * A visual indicator that can be styled to match the position of the currently
   * active tab. Renders a `<span>` element.
   *
   * This component reads two contexts that **must** be provided by ancestor
   * components (TabsRoot.svelte and TabsList.svelte).  For the context values
   * to be reactive, the parent must expose each property through a getter that
   * is backed by a `$state` variable, for example:
   *
   * ```svelte
   * <!-- TabsRoot.svelte -->
   * <script lang="ts">
   *   import { setContext } from 'svelte';
   *   import { TABS_ROOT_CONTEXT_KEY } from './TabsIndicator.svelte';
   *
   *   let value = $state(0);
   *   let orientation = $state<'horizontal' | 'vertical'>('horizontal');
   *   let tabActivationDirection = $state<TabActivationDirection>('none');
   *
   *   setContext(TABS_ROOT_CONTEXT_KEY, {
   *     get value()                  { return value; },
   *     get orientation()            { return orientation; },
   *     get tabActivationDirection() { return tabActivationDirection; },
   *     getTabElementBySelectedValue,
   *   });
   * </script>
   * ```
   *
   * ```svelte
   * <!-- TabsList.svelte -->
   * <script lang="ts">
   *   import { setContext } from 'svelte';
   *   import { TABS_LIST_CONTEXT_KEY } from './TabsIndicator.svelte';
   *
   *   let tabsListElement = $state<HTMLElement | null>(null);
   *
   *   setContext(TABS_LIST_CONTEXT_KEY, {
   *     get tabsListElement() { return tabsListElement; },
   *     registerIndicatorUpdateListener,
   *   });
   * </script>
   * ```
   *
   * CSS custom properties set on the indicator span:
   *   --active-tab-left    Distance (px) from the list's left edge to the active tab
   *   --active-tab-right   Distance (px) from the active tab to the list's right edge
   *   --active-tab-top     Distance (px) from the list's top edge to the active tab
   *   --active-tab-bottom  Distance (px) from the active tab to the list's bottom edge
   *   --active-tab-width   Width (px) of the active tab
   *   --active-tab-height  Height (px) of the active tab
   *
   * Documentation: https://base-ui.com/react/components/tabs
   */
  import { getContext, onMount } from 'svelte';

  import type { Snippet } from 'svelte';

  // ─── Context keys ─────────────────────────────────────────────────────────────

  /** Context key for the value provided by the TabsRoot ancestor. */
  export const TABS_ROOT_CONTEXT_KEY = Symbol.for('base-ui:tabs-root');

  /** Context key for the value provided by the TabsList ancestor. */
  export const TABS_LIST_CONTEXT_KEY = Symbol.for('base-ui:tabs-list');

  // ─── Exported types ───────────────────────────────────────────────────────────

  export type TabsOrientation = 'horizontal' | 'vertical';
  export type TabActivationDirection = 'left' | 'right' | 'up' | 'down' | 'none';

  export interface TabPosition {
    left: number;
    right: number;
    top: number;
    bottom: number;
  }

  export interface TabSize {
    width: number;
    height: number;
  }

  /**
   * Shape of the context object that must be provided by `TabsRoot.svelte`.
   * All mutable properties should be implemented as getters backed by `$state`
   * so that downstream consumers (including this component) react to changes.
   */
  export interface TabsRootContextValue {
    /** The currently active tab value (`null` when no tab is selected). */
    readonly value: unknown;
    /** Layout orientation of the tabs widget. */
    readonly orientation: TabsOrientation;
    /** Direction the active tab moved relative to the previously active tab. */
    readonly tabActivationDirection: TabActivationDirection;
    /**
     * Returns the DOM element of the tab whose effective value equals
     * `selectedValue`, or `null` when not found.
     */
    getTabElementBySelectedValue(selectedValue: unknown): HTMLElement | null;
  }

  /**
   * Shape of the context object that must be provided by `TabsList.svelte`.
   */
  export interface TabsListContextValue {
    /** The `<div role="tablist">` element, or `null` before it mounts. */
    readonly tabsListElement: HTMLElement | null;
    /**
     * Registers a callback that will be called whenever the indicator needs to
     * recalculate its position (e.g. after a tab resizes or the list scrolls).
     * Returns an unsubscribe function.
     */
    registerIndicatorUpdateListener(listener: () => void): () => void;
  }

  // ─── Component props ──────────────────────────────────────────────────────────

  interface Props {
    /** CSS class forwarded to the `<span>` element. */
    class?: string;
    /**
     * When `true`, an inline `<script>` is injected immediately after the
     * `<span>` during server-side rendering so the indicator is positioned
     * before the JavaScript bundle loads, eliminating the layout shift that
     * would otherwise occur on first hydration.
     * @default false
     */
    renderBeforeHydration?: boolean;
    /** Slot content (the indicator is usually self-closing). */
    children?: Snippet;
    /** Any extra HTML attributes are forwarded to the underlying `<span>`. */
    [key: string]: unknown;
  }

  let {
    class: className,
    renderBeforeHydration = false,
    children,
    ...restProps
  }: Props = $props();

  // ─── Consume contexts ─────────────────────────────────────────────────────────

  const rootCtx = getContext<TabsRootContextValue>(TABS_ROOT_CONTEXT_KEY);
  const listCtx = getContext<TabsListContextValue>(TABS_LIST_CONTEXT_KEY);

  // ─── Mount tracking ───────────────────────────────────────────────────────────

  /**
   * Becomes `true` after the component mounts on the client.
   * Used to suppress the pre-hydration script once the client has taken over.
   */
  let isMounted = $state(false);

  onMount(() => {
    isMounted = true;
  });

  // ─── Position state ───────────────────────────────────────────────────────────
  // Populated by `measurePosition()` via DOM measurements.

  let left = $state(0);
  let right = $state(0);
  let top = $state(0);
  let bottom = $state(0);
  let width = $state(0);
  let height = $state(0);
  let isTabSelected = $state(false);

  // ─── Helpers ──────────────────────────────────────────────────────────────────

  /**
   * Returns the CSS `width` and `height` of `element`, falling back to
   * `offsetWidth`/`offsetHeight` when the two disagree (which happens when a
   * CSS transform scales the element).
   */
  function getCssDimensions(element: Element): { width: number; height: number } {
    const css = getComputedStyle(element);
    // SVG elements may return empty strings → parseFloat returns NaN → fallback 0
    let w = parseFloat(css.width) || 0;
    let h = parseFloat(css.height) || 0;
    const isHtmlEl = element instanceof HTMLElement;
    const offsetW = isHtmlEl ? element.offsetWidth : w;
    const offsetH = isHtmlEl ? element.offsetHeight : h;
    if (Math.round(w) !== offsetW || Math.round(h) !== offsetH) {
      w = offsetW;
      h = offsetH;
    }
    return { width: w, height: h };
  }

  /**
   * Reads DOM layout information and updates the position `$state` variables.
   * Called both reactively (via `$effect`) and imperatively (from the
   * `registerIndicatorUpdateListener` callback).
   */
  function measurePosition(): void {
    const value = rootCtx?.value;
    const tabsListElement = listCtx?.tabsListElement;

    if (value == null || tabsListElement == null) {
      isTabSelected = false;
      return;
    }

    isTabSelected = true;

    const activeTab = rootCtx?.getTabElementBySelectedValue(value);
    if (activeTab == null) {
      // A tab is selected but its element is not (yet) in the DOM.
      return;
    }

    const { width: computedWidth, height: computedHeight } = getCssDimensions(activeTab);
    const { width: tabListWidth, height: tabListHeight } = getCssDimensions(tabsListElement);
    const tabRect = activeTab.getBoundingClientRect();
    const tabsListRect = tabsListElement.getBoundingClientRect();

    // Account for CSS transforms applied to the list container.
    const scaleX = tabListWidth > 0 ? tabsListRect.width / tabListWidth : 1;
    const scaleY = tabListHeight > 0 ? tabsListRect.height / tabListHeight : 1;
    const hasNonZeroScale =
      Math.abs(scaleX) > Number.EPSILON && Math.abs(scaleY) > Number.EPSILON;

    let newLeft: number;
    let newTop: number;

    if (hasNonZeroScale) {
      newLeft =
        (tabRect.left - tabsListRect.left) / scaleX +
        tabsListElement.scrollLeft -
        tabsListElement.clientLeft;
      newTop =
        (tabRect.top - tabsListRect.top) / scaleY +
        tabsListElement.scrollTop -
        tabsListElement.clientTop;
    } else {
      newLeft = activeTab.offsetLeft;
      newTop = activeTab.offsetTop;
    }

    left = newLeft;
    top = newTop;
    width = computedWidth;
    height = computedHeight;
    right = tabsListElement.scrollWidth - newLeft - computedWidth;
    bottom = tabsListElement.scrollHeight - newTop - computedHeight;
  }

  // ─── Effects ──────────────────────────────────────────────────────────────────

  /**
   * Re-measure whenever the active value or the list element changes.
   * Reading `rootCtx.value` and `listCtx.tabsListElement` here registers them
   * as reactive dependencies (works when the context exposes them as getters
   * backed by `$state`).
   */
  $effect(() => {
    // Explicit reads so Svelte tracks these as dependencies.
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    rootCtx?.value;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    listCtx?.tabsListElement;
    measurePosition();
  });

  /**
   * Subscribe to the list's internal "indicator needs update" signal.
   * This fires after a tab resizes (via ResizeObserver) or the list scrolls.
   */
  $effect(() => {
    if (!listCtx?.registerIndicatorUpdateListener) {
      return;
    }
    const unsubscribe = listCtx.registerIndicatorUpdateListener(measurePosition);
    return unsubscribe;
  });

  // ─── Derived values ───────────────────────────────────────────────────────────

  /** Inline style string containing the six CSS custom properties. */
  let styleString = $derived(
    isTabSelected
      ? [
          `--active-tab-left: ${left}px`,
          `--active-tab-right: ${right}px`,
          `--active-tab-top: ${top}px`,
          `--active-tab-bottom: ${bottom}px`,
          `--active-tab-width: ${width}px`,
          `--active-tab-height: ${height}px`,
        ].join('; ')
      : '',
  );

  /**
   * The indicator is hidden until it has non-zero dimensions, preventing a
   * flash of a mis-positioned element while the layout settles.
   */
  let displayIndicator = $derived(isTabSelected && width > 0 && height > 0);

  let orientationAttr = $derived(rootCtx?.orientation ?? 'horizontal');
  let activationDirectionAttr = $derived(rootCtx?.tabActivationDirection ?? 'none');

  /** Only render the indicator when a tab value is selected. */
  let hasValue = $derived(rootCtx?.value != null);

  // ─── Pre-hydration script ─────────────────────────────────────────────────────
  //
  // This is a minified, self-contained IIFE (identical in logic to
  // prehydrationScript.template.js) that runs synchronously in the server-
  // rendered HTML.  It reads the `<span>` element (its `previousElementSibling`)
  // and sets the CSS custom properties before any JS bundle has loaded, so the
  // indicator is visible and correctly positioned from the very first paint.
  //
  // The script relies on `document.currentScript`, which is only available when
  // the script executes as an inline parser-inserted script — exactly what
  // happens here during SSR.  It will NOT re-execute after hydration because the
  // `{#if !isMounted}` guard removes it from the client-rendered tree.
  //
  // Source: prehydrationScript.template.js  (see that file for the readable form)
  const prehydrationScriptContent =
    // prettier-ignore
    '!function(){const t=document.currentScript.previousElementSibling;if(!t)return;const e=t.closest(\'[role="tablist"]\');if(!e)return;const i=e.querySelector("[data-active]");if(!i)return;if(0===i.offsetWidth||0===e.offsetWidth)return;let o=0,n=0,h=0,l=0,r=0,f=0;function s(t){const e=getComputedStyle(t);let i=parseFloat(e.width)||0,o=parseFloat(e.height)||0;return(Math.round(i)!==t.offsetWidth||Math.round(o)!==t.offsetHeight)&&(i=t.offsetWidth,o=t.offsetHeight),{width:i,height:o}}if(null!=i&&null!=e){const{width:t,height:c}=s(i),{width:u,height:d}=s(e),a=i.getBoundingClientRect(),g=e.getBoundingClientRect(),p=u>0?g.width/u:1,b=d>0?g.height/d:1;if(Math.abs(p)>Number.EPSILON&&Math.abs(b)>Number.EPSILON){const t=a.left-g.left,i=a.top-g.top;o=t/p+e.scrollLeft-e.clientLeft,h=i/b+e.scrollTop-e.clientTop}else o=i.offsetLeft,h=i.offsetTop;r=t,f=c,n=e.scrollWidth-o-r,l=e.scrollHeight-h-f}function c(e,i){t.style.setProperty(`--active-tab-${e}`,`${i}px`)}c("left",o),c("right",n),c("top",h),c("bottom",l),c("width",r),c("height",f),r>0&&f>0&&t.removeAttribute("hidden")}();';
</script>

<!--
  Only render when a tab value is selected.
  Mirrors the `if (value == null) return null` guard in the React component.
-->
{#if hasValue}
  <!--
    role="presentation"       — purely decorative; screen readers ignore it.
    hidden                    — suppressed until dimensions are known and > 0,
                                preventing a flash of an incorrectly positioned
                                indicator before the layout has settled.
    data-orientation          — reflects the tabs widget orientation so
                                consumers can write CSS like
                                `[data-orientation="vertical"] { … }`.
    data-activation-direction — reflects the direction of the last tab switch
                                so consumers can write directional animations.
    style                     — six CSS custom properties (see module docs).
  -->
  <span
    role="presentation"
    style={styleString || undefined}
    hidden={!displayIndicator}
    data-orientation={orientationAttr}
    data-activation-direction={activationDirectionAttr}
    class={className}
    {...restProps}
  >{@render children?.()}</span>

  <!--
    Pre-hydration script — present only in the server-rendered HTML
    (removed once `isMounted` flips to `true` after client hydration).

    The script must be the next sibling of the <span> so that
    `document.currentScript.previousElementSibling` inside the IIFE points
    to the indicator span.

    Svelte's {@html} emits raw markup during SSR, so the <script> tag lands
    verbatim in the HTML response and executes synchronously in the browser
    before the JS bundle is parsed — which is precisely the behaviour we need.

    ⚠️  The `renderBeforeHydration` prop opts into this behaviour.  Only enable
    it when the page is server-rendered; it has no effect in a pure CSR setup.
  -->
  {#if !isMounted && renderBeforeHydration}
    {@html `<script>${prehydrationScriptContent}<\/script>`}
  {/if}
{/if}
