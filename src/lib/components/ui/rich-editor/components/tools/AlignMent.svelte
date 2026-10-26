<script lang="ts">
  import AlignLeft from '@lucide/svelte/icons/align-left';
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
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
  import { commands } from '../../commands';
  import { getEditor, useEditorTransaction } from '../../tiptap';
  import Tooltip from '../Tooltip.svelte';

  const alignments = commands['alignment'];

  const editor = getEditor();
  const transaction = useEditorTransaction(editor);

  const isActive = () => {
    void transaction.version;
    return alignments.find((h) => h.isActive?.(editor)) !== undefined;
  };

  const AlignmentIcon = () => {
    void transaction.version;
    const h = alignments.find((h) => h.isActive?.(editor));
    return h ? h.icon : AlignLeft;
  };
</script>

<Menu>
  <Tooltip tooltip="Alignment" as="span" class="inline-flex">
    <MenuTrigger
      class={buttonVariants({
        variant: 'ghost',
        size: 'icon',
        class: cn(isActive() && 'bg-muted')
      })}
    >
      {@const Icon = AlignmentIcon()}
      <Icon />
      <ChevronDown class="size-2! text-muted-foreground" />
    </MenuTrigger>
  </Tooltip>
  <MenuPopup class="w-fit">
    <MenuGroup>
      <MenuGroupLabel>Alignments</MenuGroupLabel>
      {#each alignments as alignment (alignment)}
        {@const Icon = alignment.icon}
        <MenuItem onclick={() => alignment.onClick?.(editor)}>
          <Icon />
          {alignment.tooltip}
          <MenuShortcut>
            {alignment.shortCut}
          </MenuShortcut>
        </MenuItem>
      {/each}
    </MenuGroup>
  </MenuPopup>
</Menu>
