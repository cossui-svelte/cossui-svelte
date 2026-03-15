import { getContext, setContext } from 'svelte';

export const SIDEBAR_CONTEXT_KEY = Symbol('sidebar');

export type SidebarState = 'expanded' | 'collapsed';

export type SidebarContextType = {
  readonly state: SidebarState;
  readonly open: boolean;
  setOpen: (value: boolean) => void;
  readonly openMobile: boolean;
  setOpenMobile: (value: boolean) => void;
  readonly isMobile: boolean;
  toggleSidebar: () => void;
};

export function getSidebarContext(): SidebarContextType {
  const ctx = getContext<SidebarContextType>(SIDEBAR_CONTEXT_KEY);
  if (!ctx) {
    throw new Error('getSidebarContext must be called within a SidebarProvider.');
  }
  return ctx;
}

export function setSidebarContext(ctx: SidebarContextType): void {
  setContext(SIDEBAR_CONTEXT_KEY, ctx);
}
