<script lang="ts">
  import CirclePlusFilledIcon from '@lucide/svelte/icons/circle-plus';
  import MailIcon from '@lucide/svelte/icons/mail';
  import type { Component } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
  } from '$lib/components/ui/sidebar';

  let { items }: { items: { title: string; url: string; icon?: Component }[] } = $props();
</script>

<SidebarGroup>
  <SidebarGroupContent class="flex flex-col gap-2">
    <SidebarMenu>
      <SidebarMenuItem class="flex items-center gap-2">
        <SidebarMenuButton
          class="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
          tooltipContent="Quick create"
        >
          <CirclePlusFilledIcon />
          <span>Quick Create</span>
        </SidebarMenuButton>
        <Button
          size="icon"
          class="size-8 group-data-[collapsible=icon]:opacity-0"
          variant="outline"
        >
          <MailIcon />
          <span class="sr-only">Inbox</span>
        </Button>
      </SidebarMenuItem>
    </SidebarMenu>
    <SidebarMenu>
      {#each items as item (item.title)}
        <SidebarMenuItem>
          <SidebarMenuButton tooltipContent={item.title}>
            {#if item.icon}
              <item.icon />
            {/if}
            <span>{item.title}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      {/each}
    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>
