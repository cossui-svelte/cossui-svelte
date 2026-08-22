<script lang="ts">
  import CheckIcon from '@lucide/svelte/icons/check';
  import CopyIcon from '@lucide/svelte/icons/copy';
  import UserRoundPlusIcon from '@lucide/svelte/icons/user-round-plus';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import {
    Dialog,
    DialogDescription,
    DialogHeader,
    DialogPanel,
    DialogPopup,
    DialogTitle,
    DialogTrigger
  } from '$lib/components/ui/dialog';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger
  } from '$lib/components/ui/tooltip';
  import { cn } from '$lib/utils';

  const id = $props.id();
  const magicLink = 'https://coss.com/ui/refer/87689';

  let emails = $state(['mark@yourcompany.com', 'jane@yourcompany.com', '']);
  let copied = $state(false);

  function addEmail() {
    emails = [...emails, ''];
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(magicLink);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 1500);
  }
</script>

<Dialog>
  <DialogTrigger class={buttonVariants({ variant: 'outline' })}>Invite members</DialogTrigger>
  <DialogPopup>
    <div class="flex flex-col gap-2 px-6 pt-6">
      <div class="flex size-11 shrink-0 items-center justify-center rounded-full border">
        <UserRoundPlusIcon class="opacity-80" size={16} />
      </div>
      <DialogHeader class="p-0">
        <DialogTitle class="text-left">Invite team members</DialogTitle>
        <DialogDescription class="text-left">
          Invite teammates to earn free components.
        </DialogDescription>
      </DialogHeader>
    </div>

    <DialogPanel class="flex flex-col gap-5">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <Label>Invite via email</Label>
          <div class="flex flex-col gap-3">
            {#each emails as _, index (index)}
              <Input placeholder="hi@yourcompany.com" type="email" bind:value={emails[index]} />
            {/each}
          </div>
        </div>
        <button class="text-sm underline hover:no-underline" onclick={addEmail} type="button">
          + Add another
        </button>
      </div>
      <Button class="w-full">Send invites</Button>

      <hr class="my-1 border-t">

      <div class="flex flex-col gap-2">
        <Label for={id}>Invite via magic link</Label>
        <div class="relative">
          <Input {id} class="pe-9" readonly type="text" value={magicLink} />
          <TooltipProvider delay={0}>
            <Tooltip>
              <TooltipTrigger
                aria-label={copied ? 'Copied' : 'Copy to clipboard'}
                class="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed"
                disabled={copied}
                onclick={handleCopy}
              >
                <div
                  class={cn(
                    'transition-all',
                    copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  )}
                >
                  <CheckIcon aria-hidden="true" class="stroke-emerald-500" size={16} />
                </div>
                <div
                  class={cn(
                    'absolute transition-all',
                    copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                  )}
                >
                  <CopyIcon aria-hidden="true" size={16} />
                </div>
              </TooltipTrigger>
              <TooltipPopup class="px-2 py-1 text-xs">Copy to clipboard</TooltipPopup>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </DialogPanel>
  </DialogPopup>
</Dialog>
