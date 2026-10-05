<script lang="ts">
  import type { Snippet } from 'svelte';
  import { type TreeContextValue, treeContext } from './tree-context.svelte';

  type TreeContextProviderProps = TreeContextValue & {
    children: Snippet<[]>;
  };

  const { children, ...props }: TreeContextProviderProps = $props();

  // svelte-ignore state_referenced_locally
  treeContext.set(props);
</script>

{@render children()}
