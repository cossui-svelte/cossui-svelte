<script lang="ts" module>
  type TreeItem = string | TreeItem[];

  // This is sample data.
  const data = {
    changes: [
      {
        file: 'README.md',
        state: 'M'
      },
      {
        file: 'routes/+page.svelte',
        state: 'U'
      },
      {
        file: 'routes/+layout.svelte',
        state: 'M'
      }
    ],
    tree: [
      ['lib', ['components', 'button.svelte', 'card.svelte'], 'utils.ts'],
      [
        'routes',
        ['hello', '+page.svelte', '+page.ts'],
        '+page.svelte',
        '+page.server.ts',
        '+layout.svelte'
      ],
      ['static', 'favicon.ico', 'svelte.svg'],
      'eslint.config.js',
      '.gitignore',
      'svelte.config.js',
      'tailwind.config.js',
      'package.json',
      'README.md'
    ]
  };
</script>

<script lang="ts">
  import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
  import FileIcon from '@lucide/svelte/icons/file';
  import FolderIcon from '@lucide/svelte/icons/folder';
  import type { ComponentProps } from 'svelte';
  import {
    Collapsible,
    CollapsiblePanel,
    CollapsibleTrigger
  } from '#lib/components/ui/collapsible/index.js';
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarRail
  } from '#lib/components/ui/sidebar/index.js';

  let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar> = $props();
</script>

<Sidebar bind:ref {...restProps}>
  <SidebarContent>
    <SidebarGroup>
      <SidebarGroupLabel>Changes</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {#each data.changes as item, index (index)}
            <SidebarMenuItem>
              <SidebarMenuButton>
                <FileIcon />
                {item.file}
              </SidebarMenuButton>
              <SidebarMenuBadge>{item.state}</SidebarMenuBadge>
            </SidebarMenuItem>
          {/each}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
    <SidebarGroup>
      <SidebarGroupLabel>Files</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {#each data.tree as item, index (index)}
            {@render Tree({ item })}
          {/each}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </SidebarContent>
  <SidebarRail />
</Sidebar>

{#snippet Tree({ item }: { item: TreeItem })}
  {@const [name, ...items] = Array.isArray(item) ? item : [item]}
  {#if !items.length}
    <SidebarMenuButton
      isActive={name === 'button.svelte'}
      class="data-[active=true]:bg-transparent"
    >
      <FileIcon />
      {name}
    </SidebarMenuButton>
  {:else}
    <SidebarMenuItem>
      <Collapsible
        class="group/collapsible [&[data-open]>button>svg:first-child]:rotate-90"
        open={name === 'lib' || name === 'components'}
      >
        <SidebarMenuButton>
          {#snippet child({ props })}
            <CollapsibleTrigger {...props}>
              <ChevronRightIcon class="transition-transform" />
              <FolderIcon />
              {name}
            </CollapsibleTrigger>
          {/snippet}
        </SidebarMenuButton>
        <CollapsiblePanel>
          <SidebarMenuSub>
            {#each items as subItem, index (index)}
              {@render Tree({ item: subItem })}
            {/each}
          </SidebarMenuSub>
        </CollapsiblePanel>
      </Collapsible>
    </SidebarMenuItem>
  {/if}
{/snippet}
