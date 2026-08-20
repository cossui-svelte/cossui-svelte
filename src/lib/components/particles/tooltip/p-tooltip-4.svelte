<script lang="ts">
  import LinkIcon from '@lucide/svelte/icons/link';
  import MailIcon from '@lucide/svelte/icons/mail';
  import Share2Icon from '@lucide/svelte/icons/share-2';
  import { buttonVariants } from '$lib/components/ui/button';
  import { Group, GroupSeparator } from '$lib/components/ui/group';
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger
  } from '$lib/components/ui/tooltip';
</script>

<TooltipProvider>
  <Group aria-label="Share options" orientation="vertical">
    <Tooltip>
      <TooltipTrigger
        aria-label="Copy link"
        class={buttonVariants({ size: 'icon', variant: 'outline' })}
      >
        <LinkIcon aria-hidden="true" />
      </TooltipTrigger>
      <TooltipPopup class="max-w-40" side="right">
        <span>Copy shareable link</span>
      </TooltipPopup>
    </Tooltip>
    <GroupSeparator orientation="horizontal" />
    <Tooltip>
      <TooltipTrigger
        aria-label="Share via email"
        class={buttonVariants({ size: 'icon', variant: 'outline' })}
      >
        <MailIcon aria-hidden="true" />
      </TooltipTrigger>
      <TooltipPopup class="max-w-40" side="right">
        <span>Share via email</span>
      </TooltipPopup>
    </Tooltip>
    <GroupSeparator orientation="horizontal" />
    <Tooltip>
      <TooltipTrigger
        aria-label="Share to social"
        class={buttonVariants({ size: 'icon', variant: 'outline' })}
      >
        <Share2Icon aria-hidden="true" />
      </TooltipTrigger>
      <TooltipPopup class="max-w-40" side="right">
        <span>Share to social media</span>
      </TooltipPopup>
    </Tooltip>
  </Group>
</TooltipProvider>
