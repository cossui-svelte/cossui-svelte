<script lang="ts">
  import Info from "@lucide/svelte/icons/info";
  import { buttonVariants } from "$lib/components/ui/button";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "$lib/components/ui/input-group";
  import { Label } from "$lib/components/ui/label";
  import {
    Popover,
    PopoverPopup,
    PopoverTrigger,
  } from "$lib/components/ui/popover";
</script>

<InputGroup>
  <InputGroupInput id="email-12" placeholder="team@coss.com" type="email" />
  <InputGroupAddon align="block-start">
    <Label class="text-foreground" for="email-12">Email</Label>
    <Popover>
      <PopoverTrigger
        class={`ml-auto ${buttonVariants({ size: "icon-xs", variant: "ghost" })} -m-1`}
      >
        <Info />
      </PopoverTrigger>
      <PopoverPopup side="top" tooltipStyle>
        <p>We'll use this to send you notifications</p>
      </PopoverPopup>
    </Popover>
  </InputGroupAddon>
</InputGroup>
