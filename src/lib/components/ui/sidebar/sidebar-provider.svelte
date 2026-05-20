<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { cn } from '$lib/utils.js';
import { setSidebarContext } from './sidebar-context.js';

const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_ICON = '3rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

interface Props extends HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: Snippet;
}

let {
  class: className,
  style,
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  children,
  ...restProps
}: Props = $props();

let isMobile: boolean = $state(false);
let openMobile: boolean = $state(false);
let _open: boolean = $state(defaultOpen);

let open: boolean = $derived(openProp !== undefined ? openProp : _open);
let sidebarState: 'expanded' | 'collapsed' = $derived(open ? 'expanded' : 'collapsed');

$effect(() => {
  const mq = window.matchMedia('(max-width: 767px)');
  isMobile = mq.matches;
  const handler = (e: MediaQueryListEvent) => {
    isMobile = e.matches;
  };
  mq.addEventListener('change', handler);
  return () => mq.removeEventListener('change', handler);
});

function setOpen(value: boolean): void {
  if (setOpenProp) {
    setOpenProp(value);
  } else {
    _open = value;
  }
  try {
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; max-age=${SIDEBAR_COOKIE_MAX_AGE}; path=/`;
  } catch {
    // ignore cookie errors
  }
}

function setOpenMobile(value: boolean): void {
  openMobile = value;
}

function toggleSidebar(): void {
  if (isMobile) {
    openMobile = !openMobile;
  } else {
    setOpen(!open);
  }
}

$effect(() => {
  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      toggleSidebar();
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
});

setSidebarContext({
  get isMobile() {
    return isMobile;
  },
  get open() {
    return open;
  },
  get openMobile() {
    return openMobile;
  },
  setOpen,
  setOpenMobile,
  get state() {
    return sidebarState;
  },
  toggleSidebar
});

const inlineStyle = $derived(
  `--sidebar-width: ${SIDEBAR_WIDTH}; --sidebar-width-icon: ${SIDEBAR_WIDTH_ICON}${style ? '; ' + style : ''}`
);
</script>

<div
  class={cn(
    "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
    className,
  )}
  data-slot="sidebar-wrapper"
  style={inlineStyle}
  {...restProps}
>
  {@render children?.()}
</div>
