<script lang="ts">
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import WebhookIcon from '@lucide/svelte/icons/webhook';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
  } from '#lib/components/ui/empty/index.js';
  import { Menu, MenuItem, MenuPopup, MenuTrigger } from '#lib/components/ui/menu/index.js';
  import { router } from '../../../../lib/router.svelte.js';
  import NewWebhookButton, { type CreateForOption } from './new-webhook-button.svelte';

  let { webhooks }: { webhooks: { id: string; url: string; events: string }[] } = $props();

  function handleCreateFor(option: CreateForOption) {
    router.navigate(`/settings/developer/webhooks/new?for=${encodeURIComponent(option.id)}`);
  }
</script>

{#if webhooks.length === 0}
  <Empty class="rounded-xl border border-dashed py-8 md:py-12">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <WebhookIcon />
      </EmptyMedia>
      <EmptyTitle>Create your first webhook</EmptyTitle>
      <EmptyDescription>
        With webhooks you can receive meeting data in real-time when something happens in Cal.com.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <NewWebhookButton onSelect={handleCreateFor} text="Add webhook" />
    </EmptyContent>
  </Empty>
{:else}
  <ul class="divide-y">
    {#each webhooks as webhook (webhook.id)}
      <li class="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
        <div class="min-w-0 flex-1">
          <p class="truncate font-medium text-sm">{webhook.url}</p>
          <p class="truncate text-muted-foreground text-xs">{webhook.events}</p>
        </div>
        <Menu>
          <MenuTrigger
            aria-label="Webhook options"
            class={buttonVariants({ size: 'icon-xs', variant: 'ghost' })}
          >
            <EllipsisIcon />
          </MenuTrigger>
          <MenuPopup align="end" alignOffset={-4} sideOffset={8}>
            <MenuItem>Edit</MenuItem>
            <MenuItem variant="destructive">Delete</MenuItem>
          </MenuPopup>
        </Menu>
      </li>
    {/each}
  </ul>
{/if}
