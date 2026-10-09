<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import { Switch } from '#lib/components/ui/switch/index.js';
  import { Tooltip, TooltipPopup, TooltipTrigger } from '#lib/components/ui/tooltip/index.js';
  import {
    ListItem,
    ListItemActions,
    ListItemContent,
    ListItemDescription,
    ListItemHeader,
    ListItemTitle
  } from '../../../../../components/list-item/index.js';
  import type { AnalyticsApp } from './analytics-apps-data.js';

  let {
    app,
    onToggle,
    onConfigure
  }: {
    app: AnalyticsApp;
    onToggle: (slug: string, checked: boolean) => void;
    onConfigure: (slug: string) => void;
  } = $props();

  const Icon = $derived(app.icon);
</script>

<ListItem>
  <ListItemContent>
    <div class="flex min-w-0 items-start gap-4">
      <div
        aria-hidden="true"
        class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted"
      >
        <Icon class="size-5 text-muted-foreground" />
      </div>
      <ListItemHeader>
        <ListItemTitle>{app.name}</ListItemTitle>
        <ListItemDescription class="line-clamp-2">{app.description}</ListItemDescription>
        {#if app.configurable}
          <Button
            aria-label={`Edit ${app.name} keys`}
            class="mt-2 w-fit"
            onclick={() => onConfigure(app.slug)}
            size="xs"
            variant="outline"
          >
            Edit keys
          </Button>
        {/if}
      </ListItemHeader>
    </div>
  </ListItemContent>
  <ListItemActions>
    <Tooltip>
      <TooltipTrigger as="span" class="inline-flex"
        ><Switch
          checked={app.enabled}
          onCheckedChange={(checked: boolean) => onToggle(app.slug, checked)}
        /></TooltipTrigger
      >
      <TooltipPopup sideOffset={11}>
        {app.enabled ? `Disable ${app.name}` : `Enable ${app.name}`}
      </TooltipPopup>
    </Tooltip>
  </ListItemActions>
</ListItem>
