<script lang="ts">
  import ArrowUp from "@lucide/svelte/icons/arrow-up";
  import Plus from "@lucide/svelte/icons/plus";
  import { buttonVariants } from "$lib/components/ui/button";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
  } from "$lib/components/ui/input-group";
  import {
    Menu,
    MenuItem,
    MenuPopup,
    MenuTrigger,
  } from "$lib/components/ui/menu";
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";
</script>

<TooltipProvider>
  <InputGroup>
    <InputGroupTextarea placeholder="Ask, Search or Chat…" />
    <InputGroupAddon align="block-end">
      <Menu>
        <MenuTrigger
          aria-label="Add files"
          class={`rounded-full ${buttonVariants({ size: "icon-sm", variant: "ghost" })}`}
        >
          <Plus />
        </MenuTrigger>
        <MenuPopup align="start">
          <MenuItem>Add photos &amp; files</MenuItem>
          <MenuItem>Create image</MenuItem>
          <MenuItem>Thinking</MenuItem>
          <MenuItem>Deep research</MenuItem>
        </MenuPopup>
      </Menu>
      <InputGroupText class="ml-auto">78% used</InputGroupText>
      <Tooltip>
        <TooltipTrigger
          aria-label="Send"
          class={`rounded-full ${buttonVariants({ size: "icon-sm", variant: "default" })}`}
        >
          <ArrowUp />
        </TooltipTrigger>
        <TooltipPopup>Send</TooltipPopup>
      </Tooltip>
    </InputGroupAddon>
  </InputGroup>
</TooltipProvider>
