<script lang="ts">
  import BoldIcon from '@lucide/svelte/icons/bold';
  import CheckIcon from '@lucide/svelte/icons/check';
  import CopyIcon from '@lucide/svelte/icons/copy';
  import ItalicIcon from '@lucide/svelte/icons/italic';
  import LinkIcon from '@lucide/svelte/icons/link';
  import { onDestroy } from 'svelte';
  import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.js';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import { Field, FieldDescription, FieldLabel } from '#lib/components/ui/field/index.js';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea
  } from '#lib/components/ui/input-group/index.js';
  import { Label } from '#lib/components/ui/label/index.js';
  import { Toggle } from '#lib/components/ui/toggle/index.js';
  import { Tooltip, TooltipPopup, TooltipTrigger } from '#lib/components/ui/tooltip/index.js';
  import { FieldGrid } from '../../../../../components/particles/index.js';

  let isCopied = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  onDestroy(() => clearTimeout(timer));

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    isCopied = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      isCopied = false;
    }, 2000);
  }
</script>

<div class="flex flex-col gap-6">
  <div class="flex items-center gap-4">
    <Avatar class="size-16">
      <AvatarImage
        alt="Team logo"
        src="https://pbs.twimg.com/profile_images/1994776674391457792/7utKOMi6_400x400.jpg"
      />
      <AvatarFallback class="text-xl">AI</AvatarFallback>
    </Avatar>
    <div class="flex flex-col gap-1">
      <Label class="text-sm">Team logo</Label>
      <div class="flex items-center gap-2">
        <Button size="sm" variant="outline">Upload logo</Button>
        <Button size="sm" variant="ghost">Remove</Button>
      </div>
    </div>
  </div>

  <FieldGrid class="gap-4">
    <Field>
      <FieldLabel>Team name</FieldLabel>
      <InputGroup>
        <InputGroupInput value="Acme Inc." />
      </InputGroup>
    </Field>

    <Field>
      <FieldLabel>Team URL</FieldLabel>
      <InputGroup
        class="opacity-100! has-disabled:cursor-not-allowed has-disabled:bg-muted has-disabled:text-muted-foreground has-disabled:*:cursor-not-allowed"
      >
        <InputGroupAddon>
          <InputGroupText>localhost:3000/team/</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          aria-label="Set your team URL"
          class="*:[input]:ps-0! has-disabled:*:[input]:cursor-not-allowed"
          value="acme-inc"
        />
      </InputGroup>
    </Field>
  </FieldGrid>

  <Field class="md:w-1/2">
    <FieldLabel>Team ID</FieldLabel>
    <InputGroup
      class="opacity-100! has-disabled:cursor-not-allowed has-disabled:bg-muted has-disabled:text-muted-foreground has-disabled:*:cursor-not-allowed"
    >
      <InputGroupInput
        aria-label="Team ID"
        class="has-disabled:*:[input]:cursor-not-allowed"
        disabled
        value="47"
      />
      <InputGroupAddon align="inline-end">
        <Tooltip>
          <TooltipTrigger
            aria-label="Copy team ID"
            class={buttonVariants({ size: 'icon-xs', variant: 'ghost' })}
            onclick={() => copyToClipboard('47')}
          >
            {#if isCopied}<CheckIcon />{:else}<CopyIcon />{/if}
          </TooltipTrigger>
          <TooltipPopup>
            <p>{isCopied ? 'Copied!' : 'Copy to clipboard'}</p>
          </TooltipPopup>
        </Tooltip>
      </InputGroupAddon>
    </InputGroup>
  </Field>

  <Field>
    <FieldLabel>About</FieldLabel>
    <InputGroup>
      <InputGroupTextarea placeholder="Tell us about your team…" />
      <InputGroupAddon align="block-start" class="gap-1 rounded-t-lg border-b bg-muted/72 p-2!">
        <Toggle aria-label="Toggle bold" size="sm">
          <BoldIcon aria-hidden="true" />
        </Toggle>
        <Toggle aria-label="Toggle italic" size="sm">
          <ItalicIcon aria-hidden="true" />
        </Toggle>
        <Button aria-label="Link" size="icon-sm" variant="ghost">
          <LinkIcon aria-hidden="true" />
        </Button>
      </InputGroupAddon>
    </InputGroup>
    <FieldDescription>
      A few sentences about your team. This will appear on your team's url page.
    </FieldDescription>
  </Field>
</div>
