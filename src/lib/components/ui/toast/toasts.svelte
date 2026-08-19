<script lang="ts">
  import { Toast as ToastPrimitive } from '@shardsui/svelte/toast';
  import type { ComponentProps } from 'svelte';
  import { buttonVariants } from '$lib/components/ui/button';
  import { cn } from '$lib/utils';
  import type { ToastData, ToastPosition } from './toast-manager';
  import { TOAST_ICONS, upsertReplayClassName } from './toast-utils';

  type SwipeDirection = 'up' | 'down' | 'left' | 'right';

  function getSwipeDirection(position: ToastPosition): SwipeDirection[] {
    const verticalDirection: SwipeDirection = position.startsWith('top') ? 'up' : 'down';

    if (position.includes('center')) {
      return [verticalDirection];
    }

    if (position.includes('left')) {
      return ['left', verticalDirection];
    }

    return ['right', verticalDirection];
  }

  let {
    position,
    portalProps
  }: {
    position: ToastPosition;
    portalProps?: ComponentProps<typeof ToastPrimitive.Portal>;
  } = $props();

  const manager = ToastPrimitive.getToastManager<ToastData>();
  const swipeDirection = $derived(getSwipeDirection(position));
</script>

<ToastPrimitive.Portal {...portalProps}>
  <ToastPrimitive.Viewport
    class={cn(
      'fixed z-60 mx-auto flex w-[calc(100%-var(--toast-inset)*2)] max-w-90 [--toast-inset:--spacing(4)] sm:[--toast-inset:--spacing(8)]',
      'data-[position*=top]:top-(--toast-inset)',
      'data-[position*=bottom]:bottom-(--toast-inset)',
      'data-[position*=left]:left-(--toast-inset)',
      'data-[position*=right]:right-(--toast-inset)',
      'data-[position*=center]:left-1/2 data-[position*=center]:-translate-x-1/2'
    )}
    data-position={position}
    data-slot="toast-viewport"
  >
    {#each manager.toasts as toast (toast.id)}
      {@const Icon = toast.type ? TOAST_ICONS[toast.type as keyof typeof TOAST_ICONS] : null}
      <ToastPrimitive.Root
        class={cn(
          'absolute z-[calc(9999-var(--toast-index))] h-(--toast-calc-height) w-full select-none rounded-lg border bg-[color-mix(in_srgb,var(--popover),var(--color-black)_calc(1%*max(0,var(--toast-index,0))))] not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 [transition:transform_.5s_cubic-bezier(.22,1,.36,1),opacity_.5s,height_.15s,background-color_.5s] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-expanded:bg-popover dark:bg-[color-mix(in_srgb,var(--popover),var(--color-black)_calc(6%*max(0,var(--toast-index,0))))] dark:data-expanded:bg-popover dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
          'data-[position*=right]:right-0 data-[position*=right]:left-auto',
          'data-[position*=left]:right-auto data-[position*=left]:left-0',
          'data-[position*=center]:right-0 data-[position*=center]:left-0',
          'data-[position*=top]:top-0 data-[position*=top]:bottom-auto data-[position*=top]:origin-[50%_calc(50%-50%*min(var(--toast-index,0),1))]',
          'data-[position*=bottom]:top-auto data-[position*=bottom]:bottom-0 data-[position*=bottom]:origin-[50%_calc(50%+50%*min(var(--toast-index,0),1))]',
          'after:absolute after:left-0 after:h-[calc(var(--toast-gap)+1px)] after:w-full',
          'data-[position*=top]:after:top-full',
          'data-[position*=bottom]:after:bottom-full',
          '[--toast-calc-height:var(--toast-frontmost-height,var(--toast-height))] [--toast-gap:--spacing(3)] [--toast-peek:--spacing(3)] [--toast-scale:calc(max(0,1-(var(--toast-index)*.1)))] [--toast-shrink:calc(1-var(--toast-scale))]',
          'data-[position*=top]:[--toast-calc-offset-y:calc(var(--toast-offset-y)+var(--toast-index)*var(--toast-gap)+var(--toast-swipe-movement-y))]',
          'data-[position*=bottom]:[--toast-calc-offset-y:calc(var(--toast-offset-y)*-1+var(--toast-index)*var(--toast-gap)*-1+var(--toast-swipe-movement-y))]',
          'data-[position*=top]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--toast-peek))+(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]',
          'data-[position*=bottom]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--toast-peek))-(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]',
          'data-limited:opacity-0',
          'data-expanded:h-(--toast-height)',
          'data-position:data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--toast-calc-offset-y))]',
          'data-[position*=top]:data-starting-style:transform-[translateY(calc(-100%-var(--toast-inset)))]',
          'data-[position*=bottom]:data-starting-style:transform-[translateY(calc(100%+var(--toast-inset)))]',
          'data-ending-style:opacity-0',
          'data-[position*=top]:data-ending-style:not-data-limited:not-data-swipe-direction:transform-[translateY(calc(-100%-var(--toast-inset)))]',
          'data-[position*=bottom]:data-ending-style:not-data-limited:not-data-swipe-direction:transform-[translateY(calc(100%+var(--toast-inset)))]',
          'data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]',
          'data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]',
          'data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))]',
          'data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]',
          'data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]',
          'data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]',
          'data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))]',
          'data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]',
          upsertReplayClassName(toast)
        )}
        {...toast.data?.rootProps}
        data-position={position}
        {swipeDirection}
        {toast}
      >
        <ToastPrimitive.Content
          class="pointer-events-auto flex items-center justify-between gap-1.5 overflow-hidden px-3.5 py-3 text-sm transition-opacity duration-250 data-behind:not-data-expanded:pointer-events-none data-behind:opacity-0 data-expanded:opacity-100"
        >
          <div class="flex gap-2">
            {#if Icon}
              <div
                class="[&>svg]:h-lh [&>svg]:w-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
                data-slot="toast-icon"
              >
                <Icon
                  class="in-data-[type=loading]:animate-spin in-data-[type=error]:text-destructive in-data-[type=info]:text-info in-data-[type=success]:text-success in-data-[type=warning]:text-warning in-data-[type=loading]:opacity-80"
                />
              </div>
            {/if}

            <div class="flex flex-col gap-0.5">
              <ToastPrimitive.Title class="font-medium" data-slot="toast-title" />
              <ToastPrimitive.Description
                class="text-muted-foreground"
                data-slot="toast-description"
              />
            </div>
          </div>
          {#if toast.actionProps}
            <ToastPrimitive.Action
              class={buttonVariants({ size: 'xs' })}
              data-slot="toast-action"
            />
          {/if}
        </ToastPrimitive.Content>
      </ToastPrimitive.Root>
    {/each}
  </ToastPrimitive.Viewport>
</ToastPrimitive.Portal>
