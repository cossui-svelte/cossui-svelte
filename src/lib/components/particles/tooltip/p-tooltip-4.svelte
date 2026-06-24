<script lang="ts">
  import LinkIcon from "@lucide/svelte/icons/link";
  import MailIcon from "@lucide/svelte/icons/mail";
  import Share2Icon from "@lucide/svelte/icons/share-2";
  import { Button } from "$lib/components/ui/button";
  import { Group, GroupSeparator } from "$lib/components/ui/group";
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";
</script>

<TooltipProvider>
  <Group aria-label="Share options" orientation="vertical">
    <Tooltip>
      <TooltipTrigger>
        {#snippet child({ props })}
          <Button aria-label="Copy link" size="icon" variant="outline" {...props}>
            <LinkIcon aria-hidden="true" />
          </Button>
        {/snippet}
      </TooltipTrigger>
      <TooltipPopup class="max-w-40" side="right">
        <span>Copy shareable link</span>
      </TooltipPopup>
    </Tooltip>
    <GroupSeparator orientation="horizontal" />
    <Tooltip>
      <TooltipTrigger>
        {#snippet child({ props })}
          <Button aria-label="Share via email" size="icon" variant="outline" {...props}>
            <MailIcon aria-hidden="true" />
          </Button>
        {/snippet}
      </TooltipTrigger>
      <TooltipPopup class="max-w-40" side="right">
        <span>Share via email</span>
      </TooltipPopup>
    </Tooltip>
    <GroupSeparator orientation="horizontal" />
    <Tooltip>
      <TooltipTrigger>
        {#snippet child({ props })}
          <Button aria-label="Share to social" size="icon" variant="outline" {...props}>
            <Share2Icon aria-hidden="true" />
          </Button>
        {/snippet}
      </TooltipTrigger>
      <TooltipPopup class="max-w-40" side="right">
        <span>Share to social media</span>
      </TooltipPopup>
    </Tooltip>
  </Group>
</TooltipProvider>
