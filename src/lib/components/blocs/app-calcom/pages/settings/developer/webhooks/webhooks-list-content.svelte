<script lang="ts" module>
  export type WebhookItem = {
    id: string;
    url: string;
    date?: string;
    events: string[];
    enabled?: boolean;
    userId: string;
    userName: string;
    userAvatar?: string;
    userInitials?: string;
  };

  export function getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  export type UserFilterOption = {
    id: string;
    label: string;
    avatar?: string;
  };

  export function getUniqueUsers(webhooks: WebhookItem[]): UserFilterOption[] {
    const userMap = new Map<string, UserFilterOption>();

    for (const webhook of webhooks) {
      if (!userMap.has(webhook.userId)) {
        userMap.set(webhook.userId, {
          avatar: webhook.userAvatar,
          id: webhook.userId,
          label: webhook.userName
        });
      }
    }

    return Array.from(userMap.values());
  }

  type WebhookInput =
    | WebhookItem
    | {
        id: string;
        url: string;
        events: string;
        userName?: string;
        userAvatar?: string;
        userId?: string;
        userInitials?: string;
      };

  function normalizeWebhook(webhook: WebhookInput): WebhookItem {
    if (Array.isArray(webhook.events)) {
      return webhook as WebhookItem;
    }
    const userName = webhook.userName || 'Default User';
    return {
      ...webhook,
      events: (webhook.events as string).split(',').map((e) => e.trim()),
      userAvatar: webhook.userAvatar,
      userId: webhook.userId || 'default',
      userInitials: webhook.userInitials || getInitials(userName),
      userName
    };
  }

  function groupWebhooksByUser(webhooks: WebhookItem[]) {
    const groups = new Map<string, WebhookItem[]>();
    for (const webhook of webhooks) {
      const existing = groups.get(webhook.userId) ?? [];
      existing.push(webhook);
      groups.set(webhook.userId, existing);
    }
    return Array.from(groups.entries()).map(([userId, items]) => {
      const first = items[0];
      return {
        userAvatar: first?.userAvatar,
        userId,
        userInitials: first?.userInitials ?? getInitials(first?.userName ?? ''),
        userName: first?.userName ?? 'Unknown',
        webhooks: items
      };
    });
  }
</script>

<script lang="ts">
  import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.js';
  import {
    Card,
    CardFrame,
    CardFrameHeader,
    CardFrameTitle,
    CardPanel
  } from '#lib/components/ui/card/index.js';
  import WebhookRow from './webhook-row.svelte';

  let { webhooks, selectedUserIds }: { webhooks: WebhookInput[]; selectedUserIds?: string[] } =
    $props();

  const normalized = $derived(webhooks.map(normalizeWebhook));
  const filtered = $derived(
    selectedUserIds && selectedUserIds.length > 0
      ? normalized.filter((webhook) => selectedUserIds.includes(webhook.userId))
      : normalized
  );
  const grouped = $derived(groupWebhooksByUser(filtered));
</script>

<div class="flex flex-col gap-4">
  {#each grouped as { userId, userName, userAvatar, userInitials, webhooks: userWebhooks } (userId)}
    <CardFrame>
      <CardFrameHeader>
        <CardFrameTitle class="flex items-center gap-2">
          <Avatar class="size-5">
            {#if userAvatar}
              <AvatarImage alt={userName} src={userAvatar} />
            {/if}
            <AvatarFallback class="text-xs">{userInitials}</AvatarFallback>
          </Avatar>
          {userName}
        </CardFrameTitle>
      </CardFrameHeader>
      <Card>
        <CardPanel class="p-0">
          {#each userWebhooks as webhook (webhook.id)}
            <WebhookRow {webhook} />
          {/each}
        </CardPanel>
      </Card>
    </CardFrame>
  {/each}
</div>
