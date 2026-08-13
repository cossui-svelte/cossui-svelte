<script lang="ts">
  import CircleAlertIcon from '@lucide/svelte/icons/circle-alert';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPanel,
    DialogPopup,
    DialogTitle,
    DialogTrigger
  } from '$lib/components/ui/dialog';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { cn } from '$lib/utils';

  const PROJECT_NAME = 'coss-ui';
  const id = $props.id();

  let inputValue = $state('');
</script>

<Dialog>
  <DialogTrigger class={buttonVariants({ variant: 'outline' })}>Delete project</DialogTrigger>
  <DialogPopup>
    <div class="flex flex-col items-center gap-2 px-6 pt-6">
      <div class="flex size-9 shrink-0 items-center justify-center rounded-full border">
        <CircleAlertIcon class="opacity-80" size={16} />
      </div>
      <DialogHeader class="p-0">
        <DialogTitle class="sm:text-center">Final confirmation</DialogTitle>
        <DialogDescription class="sm:text-center">
          This action cannot be undone. To confirm, please enter the project name
          <span class="text-foreground">coss-ui</span>.
        </DialogDescription>
      </DialogHeader>
    </div>

    <DialogPanel class="flex flex-col gap-5">
      <div class="flex flex-col gap-2">
        <Label for="{id}-name">Project name</Label>
        <Input id="{id}-name" placeholder="Type coss-ui to confirm" bind:value={inputValue} />
      </div>
    </DialogPanel>
    <DialogFooter>
      <DialogClose class={cn(buttonVariants({ variant: 'outline' }), 'flex-1')}>Cancel</DialogClose>
      <Button class="flex-1" disabled={inputValue !== PROJECT_NAME}>Delete</Button>
    </DialogFooter>
  </DialogPopup>
</Dialog>
