<script lang="ts">
  import './editor.css';
  import { cn } from '#lib/utils.js';
  import {
    MathBlock,
    Link,
    MathInline,
    TableColMenu,
    TableRowMenu
  } from './components/menu/index.js';
  import TiptapContent from './tiptap/components/TiptapContent.svelte';

  interface Props {
    class?: string;
  }
  const { class: className = '' }: Props = $props();
</script>

<Link />
<MathBlock />
<MathInline />
<TableColMenu />
<TableRowMenu />
<TiptapContent class={cn('relative', className)} />
