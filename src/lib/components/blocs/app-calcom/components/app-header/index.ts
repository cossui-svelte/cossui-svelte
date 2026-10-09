/**
 * AppHeader API:
 *   <AppHeader>
 *     <AppHeaderContent title="Event types">      // required `title` string; children rendered under the h1
 *       <AppHeaderDescription>…</AppHeaderDescription>   // hidden below md
 *     </AppHeaderContent>
 *     <AppHeaderActions>…buttons…</AppHeaderActions>
 *   </AppHeader>
 * All parts accept `class` plus regular HTML attributes.
 */
export { default as AppHeader } from './app-header.svelte';
export { default as AppHeaderActions } from './app-header-actions.svelte';
export { default as AppHeaderContent } from './app-header-content.svelte';
export { default as AppHeaderDescription } from './app-header-description.svelte';
