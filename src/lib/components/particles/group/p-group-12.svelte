<script lang="ts">
  import Mic from "@lucide/svelte/icons/mic";
  import Paperclip from "@lucide/svelte/icons/paperclip";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Group } from "$lib/components/ui/group";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "$lib/components/ui/input-group";
  import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";
</script>

<Group
  aria-label="Message composer"
  class="[--radius-lg:9999px] [--radius:9999rem]"
>
  <Group aria-label="Attachments">
    <Button aria-label="Attach file" size="icon" variant="outline">
      <Paperclip aria-hidden />
    </Button>
  </Group>
  <Group aria-label="Message input">
    <InputGroup>
      <InputGroupInput placeholder="Send a message" />
      <InputGroupAddon align="inline-end">
        <Tooltip>
          <TooltipTrigger
            aria-label="Voice Mode"
            class={buttonVariants({ size: "icon-xs", variant: "ghost" })}
          >
            <Mic aria-hidden />
          </TooltipTrigger>
          <TooltipContent>Voice Mode</TooltipContent>
        </Tooltip>
      </InputGroupAddon>
    </InputGroup>
  </Group>
</Group>
