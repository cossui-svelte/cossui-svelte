<script lang="ts">
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import Minus from '@lucide/svelte/icons/minus';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Menu,
    MenuGroup,
    MenuGroupLabel,
    MenuItem,
    MenuPopup,
    MenuShortcut,
    MenuTrigger
  } from '#lib/components/ui/menu/index.js';
  import { cn } from '#lib/utils.js';
  import { commands } from '../../commands/index.js';
  import { getEditor, useEditorTransaction } from '../../tiptap';
  import Tooltip from '../Tooltip.svelte';

  const lists = commands['lists'];

  const editor = getEditor();
  const transaction = useEditorTransaction(editor);
  const isActive = () => {
    void transaction.version;
    return lists.some((h) => h.isActive?.(editor));
  };

  const ListIcon = () => {
    void transaction.version;
    const h = lists.find((h) => h.isActive?.(editor));
    return h ? h.icon : Minus;
  };
</script>

<Menu>
  <Tooltip tooltip="Lists">
    {@const Icon = ListIcon()}
    <MenuTrigger
      class={buttonVariants({
        variant: 'ghost',
        size: 'icon',
        class: cn(isActive() && 'bg-muted')
      })}
    >
      <Icon />
      <ChevronDown class="size-2! text-muted-foreground" />
    </MenuTrigger>
  </Tooltip>
  <MenuPopup class="w-fit">
    <MenuGroup>
      <MenuGroupLabel>Lists</MenuGroupLabel>
      {#each lists as list (list)}
        {@const Icon = list.icon}
        <MenuItem onclick={() => list.onClick?.(editor)}>
          <Icon />
          {list.tooltip}
          <MenuShortcut>{list.shortCut}</MenuShortcut>
        </MenuItem>
      {/each}
    </MenuGroup>
  </MenuPopup>
</Menu>
