<script lang="ts">
  import Info from "@lucide/svelte/icons/info";
  import Star from "@lucide/svelte/icons/star";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "$lib/components/ui/input-group";
  import {
    Popover,
    PopoverDescription,
    PopoverPopup,
    PopoverTitle,
    PopoverTrigger,
  } from "$lib/components/ui/popover";

  let isFavorite = $state(false);
</script>

<InputGroup class="[--radius-lg:9999px] [--radius:9999rem]">
  <Popover>
    <InputGroupAddon>
      <PopoverTrigger class={buttonVariants({ size: "icon-xs", variant: "secondary" })}>
        <Info />
      </PopoverTrigger>
    </InputGroupAddon>
    <PopoverPopup align="start" alignOffset={-5} class="w-64" sideOffset={6}>
      <PopoverTitle class="text-sm">Your connection is not secure.</PopoverTitle>
      <PopoverDescription>
        You should not enter any sensitive information on this site.
      </PopoverDescription>
    </PopoverPopup>
  </Popover>
  <InputGroupAddon class="pl-1.5 text-muted-foreground">https://</InputGroupAddon>
  <InputGroupInput aria-label="Url" class="*:[input]:ps-1!" type="text" />
  <InputGroupAddon align="inline-end">
    <Button onclick={() => { isFavorite = !isFavorite; }} size="icon-xs" variant="ghost">
      <Star
        class="data-[favorite=true]:fill-primary data-[favorite=true]:stroke-primary"
        data-favorite={isFavorite}
      />
    </Button>
  </InputGroupAddon>
</InputGroup>
