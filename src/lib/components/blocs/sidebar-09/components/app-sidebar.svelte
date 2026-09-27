<script lang="ts" module>
  import ArchiveXIcon from '@lucide/svelte/icons/archive-x';
  import FileIcon from '@lucide/svelte/icons/file';
  import InboxIcon from '@lucide/svelte/icons/inbox';
  import SendIcon from '@lucide/svelte/icons/send';
  import Trash2Icon from '@lucide/svelte/icons/trash-2';

  // This is sample data
  const data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/user.jpg'
    },
    navMain: [
      {
        title: 'Inbox',
        url: '#',
        icon: InboxIcon,
        isActive: true
      },
      {
        title: 'Drafts',
        url: '#',
        icon: FileIcon,
        isActive: false
      },
      {
        title: 'Sent',
        url: '#',
        icon: SendIcon,
        isActive: false
      },
      {
        title: 'Junk',
        url: '#',
        icon: ArchiveXIcon,
        isActive: false
      },
      {
        title: 'Trash',
        url: '#',
        icon: Trash2Icon,
        isActive: false
      }
    ],
    mails: [
      {
        name: 'William Smith',
        email: 'williamsmith@example.com',
        subject: 'Meeting Tomorrow',
        date: '09:34 AM',
        teaser:
          'Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.'
      },
      {
        name: 'Alice Smith',
        email: 'alicesmith@example.com',
        subject: 'Re: Project Update',
        date: 'Yesterday',
        teaser:
          "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps."
      },
      {
        name: 'Bob Johnson',
        email: 'bobjohnson@example.com',
        subject: 'Weekend Plans',
        date: '2 days ago',
        teaser:
          "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?"
      },
      {
        name: 'Emily Davis',
        email: 'emilydavis@example.com',
        subject: 'Re: Question about Budget',
        date: '2 days ago',
        teaser:
          "I've reviewed the budget numbers you sent over.\nCan we set up a quick call to discuss some potential adjustments?"
      },
      {
        name: 'Michael Wilson',
        email: 'michaelwilson@example.com',
        subject: 'Important Announcement',
        date: '1 week ago',
        teaser:
          "Please join us for an all-hands meeting this Friday at 3 PM.\nWe have some exciting news to share about the company's future."
      },
      {
        name: 'Sarah Brown',
        email: 'sarahbrown@example.com',
        subject: 'Re: Feedback on Proposal',
        date: '1 week ago',
        teaser:
          "Thank you for sending over the proposal. I've reviewed it and have some thoughts.\nCould we schedule a meeting to discuss my feedback in detail?"
      },
      {
        name: 'David Lee',
        email: 'davidlee@example.com',
        subject: 'New Project Idea',
        date: '1 week ago',
        teaser:
          "I've been brainstorming and came up with an interesting project concept.\nDo you have time this week to discuss its potential impact and feasibility?"
      },
      {
        name: 'Olivia Wilson',
        email: 'oliviawilson@example.com',
        subject: 'Vacation Plans',
        date: '1 week ago',
        teaser:
          "Just a heads up that I'll be taking a two-week vacation next month.\nI'll make sure all my projects are up to date before I leave."
      },
      {
        name: 'James Martin',
        email: 'jamesmartin@example.com',
        subject: 'Re: Conference Registration',
        date: '1 week ago',
        teaser:
          "I've completed the registration for the upcoming tech conference.\nLet me know if you need any additional information from my end."
      },
      {
        name: 'Sophia White',
        email: 'sophiawhite@example.com',
        subject: 'Team Dinner',
        date: '1 week ago',
        teaser:
          "To celebrate our recent project success, I'd like to organize a team dinner.\nAre you available next Friday evening? Please let me know your preferences."
      }
    ]
  };
</script>

<script lang="ts">
  import CommandIcon from '@lucide/svelte/icons/command';
  import type { ComponentProps } from 'svelte';
  import { Label } from '$lib/components/ui/label';
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInput,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
  } from '$lib/components/ui/sidebar';
  import { Switch } from '$lib/components/ui/switch';
  import NavUser from './nav-user.svelte';

  let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar> = $props();

  let activeItem = $state(data.navMain[0]);
  let mails = $state(data.mails);
  const sidebar = useSidebar();
</script>

<Sidebar
  bind:ref
  collapsible="icon"
  class="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
  {...restProps}
>
  <!-- This is the first sidebar -->
  <!-- We disable collapsible and adjust width to icon. -->
  <!-- This will make the sidebar appear as icons. -->
  <Sidebar collapsible="none" class="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-e">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" class="md:h-8 md:p-0">
            {#snippet child({ props })}
              <a href="##" {...props}>
                <div
                  class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
                >
                  <CommandIcon class="size-4" />
                </div>
                <div class="grid flex-1 text-start text-sm leading-tight">
                  <span class="truncate font-medium">Acme Inc</span>
                  <span class="truncate text-xs">Enterprise</span>
                </div>
              </a>
            {/snippet}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent class="px-1.5 md:px-0">
          <SidebarMenu>
            {#each data.navMain as item (item.title)}
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltipContentProps={{
    hidden: false
  }}
                  onclick={() => {
    activeItem = item;
    const mail = data.mails.sort(() => Math.random() - 0.5);
    mails = mail.slice(0, Math.max(5, Math.floor(Math.random() * 10) + 1));
    sidebar.setOpen(true);
  }}
                  isActive={activeItem.title === item.title}
                  class="px-2.5 md:px-2"
                >
                  {#snippet tooltipContent()}
                    {item.title}
                  {/snippet}
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            {/each}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <NavUser user={data.user} />
    </SidebarFooter>
  </Sidebar>

  <!-- This is the second sidebar -->
  <!-- We disable collapsible and let it fill remaining space -->
  <Sidebar collapsible="none" class="hidden flex-1 md:flex">
    <SidebarHeader class="gap-3.5 border-b p-4">
      <div class="flex w-full items-center justify-between">
        <div class="text-base font-medium text-foreground">
          {activeItem.title}
        </div>
        <Label class="flex items-center gap-2 text-sm">
          <span>Unreads</span>
          <Switch class="shadow-none" />
        </Label>
      </div>
      <SidebarInput placeholder="Type to search..." />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup class="px-0">
        <SidebarGroupContent>
          {#each mails as mail (mail.email)}
            <a
              href="##"
              class="flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight whitespace-nowrap last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <div class="flex w-full items-center gap-2">
                <span>{mail.name}</span>
                <span class="ms-auto text-xs">{mail.date}</span>
              </div>
              <span class="font-medium">{mail.subject}</span>
              <span class="line-clamp-2 w-[260px] text-xs whitespace-break-spaces">
                {mail.teaser}
              </span>
            </a>
          {/each}
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</Sidebar>
