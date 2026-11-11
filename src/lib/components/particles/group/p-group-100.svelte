<script lang="ts">
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import MessageSquareText from '@lucide/svelte/icons/message-square-text';
  import Plug from '@lucide/svelte/icons/plug';
  import SquareTerminal from '@lucide/svelte/icons/square-terminal';
  import { Avatar, AvatarFallback } from '#lib/components/ui/avatar/index.js';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import { Group, GroupSeparator } from '#lib/components/ui/group/index.js';
  import { Menu, MenuItem, MenuPopup, MenuTrigger } from '#lib/components/ui/menu/index.js';
  import RiClaudeFill from '#lib/components/icons/ClaudeFillLogos.svelte';
  import CursorFill from '#lib/components/icons/CursorFillLogos.svelte';
  import RiOpenaiFill from '#lib/components/icons/OpenaiFillLogos.svelte';

  const prompt = `Install the Button component from cossui-svelte:
npx shadcn-svelte@latest add https://cossui-svelte.com/r/button.json`;

  const agents = [
    { icon: CursorFill, label: 'Cursor' },
    { icon: RiClaudeFill, label: 'Claude' },
    { icon: RiOpenaiFill, label: 'ChatGPT' }
  ];

  let isCopied = $state(false);
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const mcpUrl = 'https://cossui-svelte.com/mcp';
  const skillCommand = 'npx skills add cossui-svelte/cossui-svelte';

  async function writeToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
    isCopied = true;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      isCopied = false;
    }, 2000);
  }

  function copyPrompt() {
    return writeToClipboard(prompt);
  }

  function copyMcpUrl() {
    return writeToClipboard(mcpUrl);
  }

  function copySkillCommand() {
    return writeToClipboard(skillCommand);
  }

  const copyOptions = [
    { icon: MessageSquareText, label: 'Copy prompt', onclick: copyPrompt },
    { icon: Plug, label: 'Copy remote MCP url', onclick: copyMcpUrl },
    { icon: SquareTerminal, label: 'Copy npm skill command', onclick: copySkillCommand }
  ];
</script>

<Group aria-label="Agent prompt actions">
  <Button variant="outline" onclick={copyPrompt}>
    <!-- plain overlap rather than AvatarGroup: its crescent mask would cut the bordered circles -->
    <div class="flex items-center *:not-first:-ms-1.5" aria-hidden="true">
      {#each agents as agent (agent.label)}
        <Avatar class="border border-foreground/32 bg-background [--avatar-size:--spacing(5)]">
          <AvatarFallback class="bg-transparent">
            <agent.icon size="12" aria-hidden="true" />
          </AvatarFallback>
        </Avatar>
      {/each}
    </div>
    <span aria-live="polite">{isCopied ? 'Copied!' : 'Copy agent prompt'}</span>
  </Button>
  <GroupSeparator />
  <Menu>
    <MenuTrigger
      aria-label="More prompt options"
      class={buttonVariants({ size: 'icon', variant: 'outline' })}
    >
      <ChevronDown class="size-4" aria-hidden />
    </MenuTrigger>
    <MenuPopup align="end">
      {#each copyOptions as option (option.label)}
        <MenuItem onclick={option.onclick}>
          <option.icon aria-hidden />
          {option.label}
        </MenuItem>
      {/each}
    </MenuPopup>
  </Menu>
</Group>
