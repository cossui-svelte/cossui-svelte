<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    CardFrame,
    CardFrameDescription,
    CardFrameFooter,
    CardFrameHeader,
    CardFrameTitle
  } from '#lib/components/ui/card/index.js';

  let {
    description,
    buttonLabel,
    onAction
  }: { description: string; buttonLabel: string; onAction?: () => void } = $props();
</script>

<CardFrame class="flex-row items-center justify-between">
  <CardFrameHeader>
    <CardFrameTitle>Danger zone</CardFrameTitle>
    <CardFrameDescription>{description}</CardFrameDescription>
  </CardFrameHeader>

  <CardFrameFooter class="flex justify-end">
    <Button onclick={onAction} variant="destructive-outline">{buttonLabel}</Button>
  </CardFrameFooter>
</CardFrame>
