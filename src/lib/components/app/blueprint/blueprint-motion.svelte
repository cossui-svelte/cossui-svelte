<script lang="ts">
  import type { Snippet } from 'svelte';
  import { MediaQuery } from 'svelte/reactivity';

  // Ported from coss ui `components/blueprint-motion.tsx`. Shows the static
  // drawing (`children`) until the element first scrolls into view, then swaps
  // in the SMIL animation (`animation`), pausing it while off-screen, while the
  // tab is hidden, and never starting it under prefers-reduced-motion.
  let { children, animation }: { children: Snippet; animation: Snippet<[boolean]> } = $props();

  let drawing = $state<HTMLDivElement | null>(null);
  let animationEl = $state<HTMLDivElement | null>(null);
  let hasEntered = $state(false);
  let inView = $state(false);
  let pageVisible = $state(true);
  const reducedMotion = new MediaQuery('(prefers-reduced-motion: reduce)');
  const live = $derived(hasEntered && !reducedMotion.current);
  const stopped = $derived(!inView || !pageVisible || !live);

  $effect(() => {
    if (!drawing) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      inView = entry.isIntersecting;
      if (entry.isIntersecting) hasEntered = true;
    });
    observer.observe(drawing);
    return () => observer.disconnect();
  });

  $effect(() => {
    const update = () => (pageVisible = !document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  });

  $effect(() => {
    if (!live) return;
    const svg = animationEl?.querySelector('svg');
    if (!svg) return;
    if (stopped) svg.pauseAnimations();
    else svg.unpauseAnimations();
  });
</script>

<div bind:this={drawing} class="drawing relative w-full select-none" data-live={live || undefined}>
  <div class="original pointer-events-none">{@render children()}</div>
  {#if live}
    <div bind:this={animationEl} class="animation pointer-events-none absolute inset-0">
      {@render animation(stopped)}
    </div>
  {/if}
</div>

<style>
  .animation {
    display: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .drawing[data-live] .animation {
      display: block;
    }

    .drawing[data-live] .original {
      visibility: hidden;
    }
  }
</style>
