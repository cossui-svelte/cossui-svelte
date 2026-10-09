/**
 * AdaptiveMenu: renders a Menu on md+ screens and a bottom Drawer (with DrawerMenu*) below md.
 * Children are rendered twice (once per variant); each part reads the variant from context and
 * picks the matching Menu or DrawerMenu primitive. The trigger of the inactive variant is hidden with CSS.
 *
 * Usage:
 *   <AdaptiveMenu menuProps={{...}} drawerProps={{...}}>
 *     <AdaptiveMenuTrigger class={buttonVariants({ variant: 'ghost', size: 'icon' })} aria-label="More">
 *       <EllipsisIcon />                      // `children`; optional `menuChildren` / `drawerChildren` snippets override per variant
 *     </AdaptiveMenuTrigger>
 *     <AdaptiveMenuPopup align="end" side="bottom">   // also alignOffset, sideOffset, menuPopupProps, drawerPopupProps, drawerPanelProps, drawerMenuProps
 *       <AdaptiveMenuGroup show="all|desktop|mobile">
 *         <AdaptiveMenuGroupLabel>Label</AdaptiveMenuGroupLabel>
 *         <AdaptiveMenuItem onclick={...} variant="default|destructive" disabled>…</AdaptiveMenuItem>
 *         <AdaptiveMenuItem href={href('/x')}>Link</AdaptiveMenuItem>   // renders a link item
 *         <AdaptiveMenuCheckboxItem bind:checked variant="default|switch" onCheckedChange={...}>…</AdaptiveMenuCheckboxItem>
 *       </AdaptiveMenuGroup>
 *       <AdaptiveMenuSeparator show="..." />
 *     </AdaptiveMenuPopup>
 *   </AdaptiveMenu>
 *
 * Where the original used `render={<Button/>}` (React), style the trigger/item with `class` instead
 * (e.g. buttonVariants()) or `href`. Every part accepts `class`; Group/GroupLabel/Separator/Item/CheckboxItem accept `show`.
 * Items inside the drawer close it on click. Trigger forwards extra attributes (aria-label, disabled, onclick, ...).
 */
export { default as AdaptiveMenu } from './adaptive-menu.svelte';
export { default as AdaptiveMenuCheckboxItem } from './adaptive-menu-checkbox-item.svelte';
export { default as AdaptiveMenuGroup } from './adaptive-menu-group.svelte';
export { default as AdaptiveMenuGroupLabel } from './adaptive-menu-group-label.svelte';
export { default as AdaptiveMenuItem } from './adaptive-menu-item.svelte';
export { default as AdaptiveMenuPopup } from './adaptive-menu-popup.svelte';
export { default as AdaptiveMenuSeparator } from './adaptive-menu-separator.svelte';
export { default as AdaptiveMenuTrigger } from './adaptive-menu-trigger.svelte';
export type { AdaptiveMenuVariant, AdaptiveMenuVisibility } from './context.js';
