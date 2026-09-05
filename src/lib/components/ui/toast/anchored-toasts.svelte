<script lang="ts">
  import { Toast as ToastPrimitive } from '@shardsui/svelte/toast';
  import type { ComponentProps } from 'svelte';
  import { buttonVariants } from '$lib/components/ui/button';
  import { cn } from '$lib/utils';
  import type { ToastData } from './toast-manager';
  import { TOAST_ICONS, upsertReplayClassName } from './toast-utils';

  let {
    portalProps
  }: {
    portalProps?: ComponentProps<typeof ToastPrimitive.Portal>;
  } = $props();

  const manager = ToastPrimitive.getToastManager<ToastData>();
</script>

<ToastPrimitive.Portal {...portalProps}>
  <ToastPrimitive.Viewport class="outline-none" data-slot="toast-viewport-anchored">
    {#each manager.toasts as toast (toast.id)}
      {#if toast.positionerProps?.anchor}
        {@const Icon = toast.type ? TOAST_ICONS[toast.type as keyof typeof TOAST_ICONS] : null}
        {@const tooltipStyle = toast.data?.tooltipStyle ?? false}
        <ToastPrimitive.Positioner
          class="z-60 max-w-[min(--spacing(64),var(--available-width))]"
          data-slot="toast-positioner"
          sideOffset={toast.positionerProps.sideOffset ?? 4}
          {toast}
        >
          <ToastPrimitive.Root
            class={cn(
              'relative text-balance border bg-popover not-dark:bg-clip-padding text-popover-foreground text-xs transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:scale-98 data-starting-style:scale-98 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
              tooltipStyle
                ? 'rounded-md shadow-md/5 before:rounded-[calc(var(--radius-md)-1px)]'
                : 'rounded-lg shadow-lg/5 before:rounded-[calc(var(--radius-lg)-1px)]',
              upsertReplayClassName(toast)
            )}
            {...toast.data?.rootProps}
            data-slot="toast-popup"
            {toast}
          >
            {#if tooltipStyle}
              <ToastPrimitive.Content class="pointer-events-auto px-2 py-1">
                <ToastPrimitive.Title data-slot="toast-title" />
              </ToastPrimitive.Content>
            {:else}
              <ToastPrimitive.Content
                class="pointer-events-auto flex items-center justify-between gap-1.5 overflow-hidden px-3.5 py-3 text-sm"
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
            {/if}
          </ToastPrimitive.Root>
        </ToastPrimitive.Positioner>
      {/if}
    {/each}
  </ToastPrimitive.Viewport>
</ToastPrimitive.Portal>
