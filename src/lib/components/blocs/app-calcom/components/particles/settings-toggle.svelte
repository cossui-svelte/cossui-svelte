<script lang="ts">
  import {
    Card,
    CardFrameDescription,
    CardFrameHeader,
    CardFrameTitle,
    CardPanel
  } from '#lib/components/ui/card/index.js';
  import { Switch } from '#lib/components/ui/switch/index.js';

  let {
    title,
    description,
    checked = $bindable(false),
    onCheckedChange,
    disabled,
    loading = false
  }: {
    title: string;
    description: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    loading?: boolean;
  } = $props();
</script>

<Card>
  <CardPanel>
    <div class="flex items-center justify-between gap-4">
      <CardFrameHeader class="p-0">
        <CardFrameTitle>{title}</CardFrameTitle>
        <CardFrameDescription>{description}</CardFrameDescription>
      </CardFrameHeader>
      {#if loading}
        <div class="h-4.5 w-7.5 animate-pulse rounded-full bg-muted"></div>
      {:else}
        <Switch bind:checked {disabled} {onCheckedChange} />
      {/if}
    </div>
  </CardPanel>
</Card>
