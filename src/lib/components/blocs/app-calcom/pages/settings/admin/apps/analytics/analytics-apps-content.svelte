<script lang="ts">
  import SearchIcon from '@lucide/svelte/icons/search';
  import { MediaQuery } from 'svelte/reactivity';
  import {
    AlertDialog,
    AlertDialogClose,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogPopup,
    AlertDialogTitle
  } from '#lib/components/ui/alert-dialog/index.js';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import { Card, CardPanel } from '#lib/components/ui/card/index.js';
  import {
    Dialog,
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogPanel,
    DialogPopup,
    DialogTitle
  } from '#lib/components/ui/dialog/index.js';
  import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
  } from '#lib/components/ui/empty/index.js';
  import { Field, FieldLabel } from '#lib/components/ui/field/index.js';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
  } from '#lib/components/ui/input-group/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { ScrollArea } from '#lib/components/ui/scroll-area/index.js';
  import { toastManager } from '#lib/components/ui/toast/index.js';
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../../components/app-header/index.js';
  import { router } from '../../../../../lib/router.svelte.js';
  import AnalyticsAppRow from './analytics-app-row.svelte';
  import { ANALYTICS_APPS, APP_CATEGORIES } from './analytics-apps-data.js';

  const isSmallScreen = new MediaQuery('(max-width: 639.98px)');

  let apps = $state(ANALYTICS_APPS);
  let searchQuery = $state('');
  let disableDialogAppSlug = $state<string | null>(null);
  let editDialogAppSlug = $state<string | null>(null);
  let editKeys = $state({ client_id: '', client_secret: '' });

  const filteredApps = $derived.by(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return apps;

    return apps.filter(
      (app) =>
        app.name.toLowerCase().includes(query) || app.description.toLowerCase().includes(query)
    );
  });

  function handleToggle(slug: string, checked: boolean) {
    if (!checked) {
      disableDialogAppSlug = slug;
      return;
    }

    apps = apps.map((app) => (app.slug === slug ? { ...app, enabled: checked } : app));
    toastManager.add({ title: 'App enabled', type: 'success' });
  }

  function handleDisableConfirm() {
    if (!disableDialogAppSlug) return;

    apps = apps.map((app) =>
      app.slug === disableDialogAppSlug ? { ...app, enabled: false } : app
    );
    toastManager.add({ title: 'App disabled', type: 'success' });
    disableDialogAppSlug = null;
  }

  function handleDisableDialogOpenChange(open: boolean) {
    if (!open) disableDialogAppSlug = null;
  }

  function handleConfigure(slug: string) {
    editKeys = { client_id: '', client_secret: '' };
    editDialogAppSlug = slug;
  }

  function handleEditDialogOpenChange(open: boolean) {
    if (!open) editDialogAppSlug = null;
  }

  function handleEditKeysSave() {
    toastManager.add({ title: 'Keys saved', type: 'success' });
    editDialogAppSlug = null;
  }

  function isCategoryActive(category: (typeof APP_CATEGORIES)[number]) {
    return router.path.endsWith('/analytics')
      ? category.id === 'analytics'
      : router.path === category.href;
  }
</script>

{#snippet categoryButton(category: (typeof APP_CATEGORIES)[number])}
  {@const Icon = category.icon}
  <Button
    class="justify-start"
    data-pressed={isCategoryActive(category) ? true : undefined}
    onclick={() => router.navigate(category.href)}
    variant="ghost"
  >
    <Icon aria-hidden="true" />
    {category.label}
  </Button>
{/snippet}

<AlertDialog open={disableDialogAppSlug !== null} onOpenChange={handleDisableDialogOpenChange}>
  <AlertDialogPopup>
    <AlertDialogHeader>
      <AlertDialogTitle>Disable app</AlertDialogTitle>
      <AlertDialogDescription>
        Disabling this app could cause problems with how your users interact with Cal
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</AlertDialogClose>
      <AlertDialogClose class={buttonVariants()} onclick={handleDisableConfirm}>
        Confirm
      </AlertDialogClose>
    </AlertDialogFooter>
  </AlertDialogPopup>
</AlertDialog>

<Dialog open={editDialogAppSlug !== null} onOpenChange={handleEditDialogOpenChange}>
  <DialogPopup showCloseButton={false}>
    <DialogHeader>
      <DialogTitle>Edit keys</DialogTitle>
    </DialogHeader>
    <DialogPanel class="flex flex-col gap-4">
      <Field>
        <FieldLabel>client_id</FieldLabel>
        <Input bind:value={editKeys.client_id} type="text" />
      </Field>
      <Field>
        <FieldLabel>client_secret</FieldLabel>
        <Input bind:value={editKeys.client_secret} type="text" />
      </Field>
    </DialogPanel>
    <DialogFooter>
      <DialogClose class={buttonVariants({ variant: 'ghost' })}>Close</DialogClose>
      <Button onclick={handleEditKeysSave}>Save</Button>
    </DialogFooter>
  </DialogPopup>
</Dialog>

<AppHeader>
  <AppHeaderContent title="Apps">
    <AppHeaderDescription>Enable apps for your instance of Cal</AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<div class="flex flex-col gap-6 sm:flex-row">
  {#if isSmallScreen.current}
    <ScrollArea class="-mx-4 w-[calc(100%+--spacing(4)*2)]" overscrollContain scrollbarGutter>
      <div class="flex w-max gap-0.5 px-4">
        {#each APP_CATEGORIES as category (category.id)}
          <div class="shrink-0">
            {@render categoryButton(category)}
          </div>
        {/each}
      </div>
    </ScrollArea>
  {:else}
    <nav
      aria-label="App categories"
      class="sticky top-4 flex w-48 shrink-0 flex-col gap-0.5 self-start"
    >
      {#each APP_CATEGORIES as category (category.id)}
        {@render categoryButton(category)}
      {/each}
    </nav>
  {/if}
  <div class="min-w-0 flex-1">
    <div class="mb-4">
      <InputGroup class="w-full">
        <InputGroupInput
          bind:value={searchQuery}
          aria-label="Search analytics apps"
          placeholder="Search apps…"
          type="search"
        />
        <InputGroupAddon>
          <SearchIcon aria-hidden="true" />
        </InputGroupAddon>
      </InputGroup>
    </div>

    {#if filteredApps.length > 0}
      <Card>
        <CardPanel class="p-0">
          {#each filteredApps as app (app.id)}
            <AnalyticsAppRow {app} onConfigure={handleConfigure} onToggle={handleToggle} />
          {/each}
        </CardPanel>
      </Card>
    {:else}
      <Empty class="rounded-xl border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchIcon aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>No apps found</EmptyTitle>
          <EmptyDescription>Try a different search term or browse another category</EmptyDescription
          >
        </EmptyHeader>
        <Button onclick={() => (searchQuery = '')} variant="outline">Clear search</Button>
      </Empty>
    {/if}
  </div>
</div>
