<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { class: className, children, ...restProps }: Props = $props();

  let spanEl = $state<HTMLElement | null>(null);

  let left = $state(0);
  let right = $state(0);
  let top = $state(0);
  let bottom = $state(0);
  let width = $state(0);
  let height = $state(0);
  let isTabSelected = $state(false);
  let orientation = $state<"horizontal" | "vertical">("horizontal");

  function getCssDimensions(element: Element): { width: number; height: number } {
    const css = getComputedStyle(element);
    let w = parseFloat(css.width) || 0;
    let h = parseFloat(css.height) || 0;
    const isHtmlEl = element instanceof HTMLElement;
    const offsetW = isHtmlEl ? element.offsetWidth : w;
    const offsetH = isHtmlEl ? element.offsetHeight : h;
    if (Math.round(w) !== offsetW || Math.round(h) !== offsetH) {
      w = offsetW;
      h = offsetH;
    }
    return { height: h, width: w };
  }

  function measure(): void {
    if (!spanEl) return;
    const tabsList = spanEl.closest('[role="tablist"]') as HTMLElement | null;
    if (!tabsList) return;

    const activeTab = tabsList.querySelector('[data-state="active"]') as HTMLElement | null;
    if (!activeTab) {
      isTabSelected = false;
      return;
    }

    isTabSelected = true;
    orientation = (tabsList.dataset.orientation as "horizontal" | "vertical") ?? "horizontal";

    const { width: computedWidth, height: computedHeight } = getCssDimensions(activeTab);
    const { width: tabListWidth, height: tabListHeight } = getCssDimensions(tabsList);
    const tabRect = activeTab.getBoundingClientRect();
    const tabsListRect = tabsList.getBoundingClientRect();

    const scaleX = tabListWidth > 0 ? tabsListRect.width / tabListWidth : 1;
    const scaleY = tabListHeight > 0 ? tabsListRect.height / tabListHeight : 1;
    const hasNonZeroScale =
      Math.abs(scaleX) > Number.EPSILON && Math.abs(scaleY) > Number.EPSILON;

    let newLeft: number;
    let newTop: number;

    if (hasNonZeroScale) {
      newLeft =
        (tabRect.left - tabsListRect.left) / scaleX +
        tabsList.scrollLeft -
        tabsList.clientLeft;
      newTop =
        (tabRect.top - tabsListRect.top) / scaleY +
        tabsList.scrollTop -
        tabsList.clientTop;
    } else {
      newLeft = activeTab.offsetLeft;
      newTop = activeTab.offsetTop;
    }

    left = newLeft;
    top = newTop;
    width = computedWidth;
    height = computedHeight;
    right = tabsList.scrollWidth - newLeft - computedWidth;
    bottom = tabsList.scrollHeight - newTop - computedHeight;
  }

  $effect(() => {
    if (!spanEl) return;
    const tabsList = spanEl.closest('[role="tablist"]') as HTMLElement | null;
    if (!tabsList) return;

    measure();

    const mutationObserver = new MutationObserver(measure);
    mutationObserver.observe(tabsList, {
      attributeFilter: ["data-state"],
      attributes: true,
      subtree: true,
    });

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(tabsList);
    for (const trigger of tabsList.querySelectorAll('[role="tab"]')) {
      resizeObserver.observe(trigger);
    }

    tabsList.addEventListener("scroll", measure);

    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      tabsList.removeEventListener("scroll", measure);
    };
  });

  let styleString = $derived(
    isTabSelected
      ? [
          `--active-tab-left: ${left}px`,
          `--active-tab-right: ${right}px`,
          `--active-tab-top: ${top}px`,
          `--active-tab-bottom: ${bottom}px`,
          `--active-tab-width: ${width}px`,
          `--active-tab-height: ${height}px`,
        ].join("; ")
      : "",
  );

  let displayIndicator = $derived(isTabSelected && width > 0 && height > 0);
</script>

<span
  bind:this={spanEl}
  role="presentation"
  style={styleString || undefined}
  hidden={!displayIndicator}
  data-orientation={orientation}
  class={className}
  {...restProps}>{@render children?.()}</span
>
