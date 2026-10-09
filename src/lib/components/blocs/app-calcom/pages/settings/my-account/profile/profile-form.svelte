<script lang="ts">
  import BoldIcon from '@lucide/svelte/icons/bold';
  import CheckIcon from '@lucide/svelte/icons/check';
  import CopyIcon from '@lucide/svelte/icons/copy';
  import ItalicIcon from '@lucide/svelte/icons/italic';
  import LinkIcon from '@lucide/svelte/icons/link';
  import PlusIcon from '@lucide/svelte/icons/plus';
  import { onDestroy } from 'svelte';
  import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.js';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import { Field, FieldDescription, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Fieldset, FieldsetLegend } from '#lib/components/ui/fieldset/index.js';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea
  } from '#lib/components/ui/input-group/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { Label } from '#lib/components/ui/label/index.js';
  import { Toggle } from '#lib/components/ui/toggle/index.js';
  import { Tooltip, TooltipPopup, TooltipTrigger } from '#lib/components/ui/tooltip/index.js';
  import { FieldGrid, FieldGridRow } from '../../../../components/particles/index.js';
  import EmailInput from './email-input.svelte';

  interface EmailItem {
    email: string;
    isPrimary?: boolean;
    isVerified?: boolean;
  }

  const emails: EmailItem[] = [
    { email: 'pasquale@cal.com', isPrimary: true, isVerified: true },
    { email: 'test@sfsfd.com', isPrimary: false, isVerified: false }
  ];

  let isCopied = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  onDestroy(() => clearTimeout(timer));

  async function copyToClipboard(value: string) {
    try {
      await navigator.clipboard.writeText(value);
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

<FieldGrid>
  <div class="flex items-center gap-4 max-md:col-span-2">
    <Avatar class="size-16">
      <AvatarImage
        alt="Profile picture"
        src="https://pbs.twimg.com/profile_images/1994776674391457792/7utKOMi6_400x400.jpg"
      />
      <AvatarFallback class="text-xl">PV</AvatarFallback>
    </Avatar>
    <div class="flex flex-col gap-1">
      <Label class="text-sm">Profile picture</Label>
      <div class="flex items-center gap-2">
        <Button size="sm" variant="outline">Upload avatar</Button>
        <Button size="sm" variant="ghost">Remove</Button>
      </div>
    </div>
  </div>

  <FieldGridRow>
    <FieldGrid class="gap-4">
      <Field>
        <FieldLabel>Username</FieldLabel>
        <InputGroup
          class="opacity-100! has-disabled:cursor-not-allowed has-disabled:bg-muted has-disabled:text-muted-foreground has-disabled:*:cursor-not-allowed"
        >
          <InputGroupAddon>
            <InputGroupText>i.cal.com/</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            aria-label="Set your URL"
            class="*:[input]:ps-0! has-disabled:*:[input]:cursor-not-allowed"
            disabled
            value="pasquale"
          />
          <InputGroupAddon align="inline-end">
            <Tooltip>
              <TooltipTrigger
                aria-label="Copy URL"
                class={buttonVariants({ size: 'icon-xs', variant: 'ghost' })}
                onclick={() => copyToClipboard('https://i.cal.com/pasquale')}
                type="button"
              >
                {#if isCopied}<CheckIcon />{:else}<CopyIcon />{/if}
              </TooltipTrigger>
              <TooltipPopup>
                <p>{isCopied ? 'Copied!' : 'Copy to clipboard'}</p>
              </TooltipPopup>
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>
          Tip: You can add a '+' between usernames (e.g. cal.com/anna+brian) to meet with multiple
          people
        </FieldDescription>
      </Field>

      <Field>
        <FieldLabel>Full name</FieldLabel>
        <Input value="Pasquale Vitiello" />
      </Field>
    </FieldGrid>
  </FieldGridRow>

  <FieldGridRow>
    <Fieldset class="flex w-full flex-col gap-2">
      <FieldsetLegend
        class="inline-flex items-center gap-2 font-medium text-base/4.5 text-foreground sm:text-sm/4"
      >
        Email
      </FieldsetLegend>
      <FieldGrid class="w-full gap-2 md:gap-4">
        {#each emails as item (item.email)}
          <EmailInput email={item.email} isPrimary={item.isPrimary} isVerified={item.isVerified} />
        {/each}
      </FieldGrid>
      <div>
        <Button size="sm" variant="outline">
          <PlusIcon />
          Add email
        </Button>
      </div>
    </Fieldset>
  </FieldGridRow>

  <FieldGridRow>
    <Field>
      <FieldLabel>About</FieldLabel>
      <InputGroup>
        <InputGroupTextarea placeholder="Tell us about yourself…" />
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
    </Field>
  </FieldGridRow>
</FieldGrid>
