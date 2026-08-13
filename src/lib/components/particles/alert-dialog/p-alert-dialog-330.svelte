<script lang="ts">
  import CheckIcon from '@lucide/svelte/icons/check';
  import RefreshCcwIcon from '@lucide/svelte/icons/refresh-ccw';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogHeader,
    DialogPanel,
    DialogPopup,
    DialogTitle,
    DialogTrigger
  } from '$lib/components/ui/dialog';
  import { Label } from '$lib/components/ui/label';
  import { Radio, RadioGroup } from '$lib/components/ui/radio-group';

  const id = $props.id();

  const plans = [
    { description: '$4 per member/month', name: 'Essential', value: '1' },
    { description: '$19 per member/month', name: 'Standard', value: '2' },
    { description: '$32 per member/month', name: 'Enterprise', value: '3' }
  ];

  const features = [
    'Create unlimited projects.',
    'Remove watermarks.',
    'Add unlimited users and free viewers.',
    'Upload unlimited files.',
    '7-day money back guarantee.',
    'Advanced permissions.'
  ];
</script>

<Dialog>
  <DialogTrigger class={buttonVariants({ variant: 'outline' })}>Change plan</DialogTrigger>
  <DialogPopup>
    <div class="flex flex-col gap-2 px-6 pt-6">
      <div class="flex size-11 shrink-0 items-center justify-center rounded-full border">
        <RefreshCcwIcon class="opacity-80" size={16} />
      </div>
      <DialogHeader class="p-0">
        <DialogTitle class="text-left">Change your plan</DialogTitle>
        <DialogDescription class="text-left">Pick one of the following plans.</DialogDescription>
      </DialogHeader>
    </div>

    <DialogPanel class="flex flex-col gap-5">
      <RadioGroup class="gap-2" value="2">
        {#each plans as plan (plan.value)}
          <div
            class="relative flex w-full items-center gap-2 rounded-md border border-input px-4 py-3 shadow-xs outline-none has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent"
          >
            <Radio
              aria-describedby="{id}-{plan.value}-description"
              class="order-1 after:absolute after:inset-0"
              id="{id}-{plan.value}"
              value={plan.value}
            />
            <div class="grid grow gap-1">
              <Label for="{id}-{plan.value}">{plan.name}</Label>
              <p class="text-muted-foreground text-xs" id="{id}-{plan.value}-description">
                {plan.description}
              </p>
            </div>
          </div>
        {/each}
      </RadioGroup>

      <div class="flex flex-col gap-3">
        <p><strong class="font-medium text-sm">Features include:</strong></p>
        <ul class="flex flex-col gap-2 text-muted-foreground text-sm">
          {#each features as feature (feature)}
            <li class="flex gap-2">
              <CheckIcon aria-hidden="true" class="mt-0.5 shrink-0 text-primary" size={16} />
              {feature}
            </li>
          {/each}
        </ul>
      </div>

      <div class="grid gap-2">
        <Button class="w-full">Change plan</Button>
        <DialogClose class={buttonVariants({ variant: 'ghost' })}>Cancel</DialogClose>
      </div>
    </DialogPanel>
  </DialogPopup>
</Dialog>
