<script lang="ts">
  import GaugeIcon from '@lucide/svelte/icons/gauge';
  import LogOutIcon from '@lucide/svelte/icons/log-out';
  import MessageCircleQuestionMarkIcon from '@lucide/svelte/icons/message-circle-question-mark';
  import MilestoneIcon from '@lucide/svelte/icons/milestone';
  import MonitorDownIcon from '@lucide/svelte/icons/monitor-down';
  import MoonStarIcon from '@lucide/svelte/icons/moon-star';
  import SettingsIcon from '@lucide/svelte/icons/settings';
  import UserRoundIcon from '@lucide/svelte/icons/user-round';
  import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.js';
  import { mediaQuery } from '../lib/media-query.svelte.js';
  import { href } from '../lib/router.svelte.js';
  import { sidebarMenuButtonClass } from '../ui/index.js';
  import {
    AdaptiveMenu,
    AdaptiveMenuGroup,
    AdaptiveMenuGroupLabel,
    AdaptiveMenuItem,
    AdaptiveMenuPopup,
    AdaptiveMenuSeparator,
    AdaptiveMenuTrigger
  } from './adaptive-menu/index.js';

  let { variant = 'sidebar' }: { variant?: 'sidebar' | 'mobile' } = $props();

  const isBetweenMdAndLg = mediaQuery('md:max-lg');
</script>

<AdaptiveMenu>
  <AdaptiveMenuTrigger
    class="{sidebarMenuButtonClass} relative shrink-0 justify-center p-0 lg:size-8"
  >
    <Avatar class="lg:size-6">
      <AvatarImage
        alt="Luke Tracy"
        src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
      />
      <AvatarFallback>LT</AvatarFallback>
    </Avatar>
    <span
      class="absolute right-[3px] bottom-[3px] size-2.5 rounded-full border-2 border-sidebar bg-emerald-500 lg:right-0.5 lg:bottom-0.5"
    ></span>
    <span class="sr-only">User menu</span>
  </AdaptiveMenuTrigger>
  <AdaptiveMenuPopup
    align={variant === 'mobile' ? 'end' : 'start'}
    alignOffset={variant === 'sidebar' && isBetweenMdAndLg.current ? -3 : undefined}
    side={variant === 'mobile' ? 'bottom' : isBetweenMdAndLg.current ? 'right' : 'bottom'}
  >
    <AdaptiveMenuGroup>
      <AdaptiveMenuGroupLabel>Luke Tracy</AdaptiveMenuGroupLabel>
      <AdaptiveMenuItem>
        <UserRoundIcon aria-hidden="true" />
        My profile
      </AdaptiveMenuItem>
      <AdaptiveMenuItem href={href('/settings/my-account/general')}>
        <SettingsIcon aria-hidden="true" />
        My settings
      </AdaptiveMenuItem>
      <AdaptiveMenuItem>
        <MoonStarIcon aria-hidden="true" />
        Out of office
      </AdaptiveMenuItem>
    </AdaptiveMenuGroup>
    <AdaptiveMenuSeparator />
    <AdaptiveMenuGroup>
      <AdaptiveMenuItem>
        <MilestoneIcon aria-hidden="true" />
        Roadmap
      </AdaptiveMenuItem>
      <AdaptiveMenuItem>
        <MessageCircleQuestionMarkIcon aria-hidden="true" />
        Help
      </AdaptiveMenuItem>
      <AdaptiveMenuItem>
        <MonitorDownIcon aria-hidden="true" />
        Download desktop app
      </AdaptiveMenuItem>
      <AdaptiveMenuItem>
        <GaugeIcon aria-hidden="true" />
        Platform
      </AdaptiveMenuItem>
    </AdaptiveMenuGroup>
    <AdaptiveMenuSeparator />
    <AdaptiveMenuItem>
      <LogOutIcon aria-hidden="true" />
      Sign out
    </AdaptiveMenuItem>
  </AdaptiveMenuPopup>
</AdaptiveMenu>
