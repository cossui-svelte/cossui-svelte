<script lang="ts">
  import AppCommand from './components/app-command/app-command.svelte';
  import DashboardLayout from './components/dashboard-layout.svelte';
  import RouteNotFound from './components/route-not-found.svelte';
  import SettingsLayout from './components/settings-layout.svelte';
  import { router } from './lib/router.svelte.js';
  import { matchRoute } from './routes.js';

  // The calcom example app (https://github.com/cosscom/coss/tree/main/apps/examples/calcom) as a single bloc.
  // Routes are hash-based (`#/event-types`), so the whole app works inside the bloc's preview iframe.
  const match = $derived(matchRoute(router.path));
  const Layout = $derived(match.layout === 'settings' ? SettingsLayout : DashboardLayout);

  // The command dialog (handle-based) touches `requestAnimationFrame`, so it only mounts in the browser.
  let mounted = $state(false);
  $effect(() => {
    mounted = true;
  });

  $effect(() => router.listen());

  $effect(() => {
    if (match.route?.redirect) router.replace(match.route.redirect);
  });
</script>

<div
  class="relative bg-sidebar font-sans text-foreground antialiased [--sidebar-foreground:color-mix(in_srgb,var(--color-neutral-800)_80%,var(--sidebar))] dark:[--sidebar-foreground:color-mix(in_srgb,var(--color-neutral-200)_80%,var(--sidebar))]"
>
  {#if mounted}
    <AppCommand />
  {/if}
  <Layout>
    {#key match.route?.pattern ?? router.path}
      {#if match.route?.load}
        {#await match.route.load() then module}
          {@const Page = module.default}
          <Page params={match.params} />
        {/await}
      {:else if !match.route}
        <RouteNotFound />
      {/if}
    {/key}
  </Layout>
</div>
