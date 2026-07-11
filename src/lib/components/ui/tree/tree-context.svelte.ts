import { Context } from 'runed';
import type { ReactiveItemInstance, ReactiveTree } from './use-tree.svelte';

export interface TreeContextValue<T = unknown> {
  currentItem?: ReactiveItemInstance<T>;
  indent: number;
  tree?: ReactiveTree<T>;
}

export const treeContext = new Context<TreeContextValue | undefined>('tree:context');

export function useTreeContext<T = unknown>() {
  const context = treeContext.get();

  if (!context) {
    throw new Error('useTree must be used within a Tree');
  }

  return context as TreeContextValue<T>;
}
