<script lang="ts">
  import SmilePlusIcon from '@lucide/svelte/icons/smile-plus';
  import type { ComponentProps } from 'svelte';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import { Popover, PopoverPopup, PopoverTrigger } from '#lib/components/ui/popover/index.js';
  import { Tooltip, TooltipPopup } from '#lib/components/ui/tooltip/index.js';
  import { ChatTip } from './chat-tip.svelte.js';
  import { useChatPopupDismissal } from './use-chat-popup-dismissal.svelte.js';

  type Props = {
    options: readonly { emoji: string; label: string }[];
    selectedEmojis: readonly string[];
    triggerLabel: string;
    triggerTooltip: string;
    popupLabel: string;
    popupAlign?: ComponentProps<typeof PopoverPopup>['align'];
    popupAnchor?: ComponentProps<typeof PopoverPopup>['customAnchor'];
    onSelect: (emoji: string) => void;
  };

  let {
    options,
    selectedEmojis,
    triggerLabel,
    triggerTooltip,
    popupLabel,
    popupAlign,
    popupAnchor,
    onSelect
  }: Props = $props();

  let open = $state(false);
  let trigger = $state<HTMLElement | null>(null);
  const tip = new ChatTip();

  useChatPopupDismissal(
    () => open,
    () => trigger,
    () => (open = false)
  );
</script>

<Popover bind:open>
  <Tooltip bind:open={tip.open}>
    <PopoverTrigger
      bind:ref={trigger}
      class={buttonVariants({ size: 'icon-xs', variant: 'ghost' }) +
        ' pointer-coarse:size-8 rounded-full before:rounded-full'}
      aria-label={triggerLabel}
      onmousedown={(event: MouseEvent) => {
        if (event.button === 0) event.preventDefault();
      }}
      {...tip.props}
    >
      <SmilePlusIcon aria-hidden="true" class="size-3.5" />
    </PopoverTrigger>
    <TooltipPopup customAnchor={trigger}>{triggerTooltip}</TooltipPopup>
  </Tooltip>
  <PopoverPopup
    customAnchor={popupAnchor}
    side="top"
    align={popupAlign}
    aria-label={popupLabel}
    initialFocus={(interaction) => interaction === 'keyboard'}
    finalFocus={(interaction) => interaction === 'keyboard'}
    class="transform-gpu rounded-full before:rounded-full **:data-[slot=popover-viewport]:p-1"
  >
    <div class="flex">
      {#each options as { emoji, label } (emoji)}
        <Button
          aria-label={label}
          aria-pressed={selectedEmojis.includes(emoji)}
          variant="ghost"
          size="icon-lg"
          class="rounded-full before:rounded-full"
          onmousedown={(event: MouseEvent) => {
            if (event.button === 0) event.preventDefault();
          }}
          onclick={() => {
            onSelect(emoji);
            open = false;
          }}
        >
          <span aria-hidden="true" class="text-lg leading-none">{emoji}</span>
        </Button>
      {/each}
    </div>
  </PopoverPopup>
</Popover>
