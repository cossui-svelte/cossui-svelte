<script lang="ts">
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import UsersIcon from '@lucide/svelte/icons/users';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Collapsible,
    CollapsiblePanel,
    CollapsibleTrigger
  } from '#lib/components/ui/collapsible/index.js';
  import { Frame, FrameHeader, FramePanel } from '#lib/components/ui/frame/index.js';
  import { Switch } from '#lib/components/ui/switch/index.js';
  import { Tooltip, TooltipPopup, TooltipTrigger } from '#lib/components/ui/tooltip/index.js';
  import {
    ListItem,
    ListItemActions,
    ListItemContent,
    ListItemDescription,
    ListItemHeader,
    ListItemTitle
  } from '../../../../components/list-item/index.js';
  import type { FeatureFlag } from './flags-data.js';

  let {
    type,
    flags,
    onAssignUsers,
    onToggle
  }: {
    type: string;
    flags: FeatureFlag[];
    onToggle: (slug: string, checked: boolean) => void;
    onAssignUsers: (slug: string) => void;
  } = $props();

  let open = $state(true);
</script>

<Frame>
  <Collapsible bind:open>
    <FrameHeader class="flex flex-row items-center justify-between px-2 py-2">
      <CollapsibleTrigger
        class={buttonVariants({
          class: 'data-panel-open:[&_svg]:rotate-180',
          variant: 'ghost'
        })}
      >
        <ChevronDownIcon />
        {type}
      </CollapsibleTrigger>
    </FrameHeader>
    <CollapsiblePanel>
      <FramePanel class="p-0">
        {#each flags as flag (flag.slug)}
          <ListItem>
            <ListItemContent>
              <ListItemHeader>
                <ListItemTitle>{flag.slug}</ListItemTitle>
                <ListItemDescription>{flag.description}</ListItemDescription>
              </ListItemHeader>
            </ListItemContent>
            <ListItemActions>
              <Tooltip>
                <TooltipTrigger as="span" class="inline-flex"
                  ><Switch
                    checked={flag.enabled}
                    onCheckedChange={(checked: boolean) => onToggle(flag.slug, checked)}
                  /></TooltipTrigger
                >
                <TooltipPopup sideOffset={11}>
                  {flag.enabled ? 'Disable flag' : 'Enable flag'}
                </TooltipPopup>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger
                  aria-label="Assign to users"
                  class={buttonVariants({ size: 'icon', variant: 'outline' })}
                  onclick={() => onAssignUsers(flag.slug)}
                >
                  <UsersIcon />
                </TooltipTrigger>
                <TooltipPopup sideOffset={11}>Assign to users</TooltipPopup>
              </Tooltip>
            </ListItemActions>
          </ListItem>
        {/each}
      </FramePanel>
    </CollapsiblePanel>
  </Collapsible>
</Frame>
