<svelte:options namespace="svg" />

<script lang="ts" module>
  export type AssemblyScene = 'workspace' | 'booking' | 'activity';
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    scene,
    part,
    trailingMotion,
    thumbMotion
  }: {
    scene: AssemblyScene;
    part: 0 | 1 | 2;
    trailingMotion?: Snippet;
    thumbMotion?: Snippet;
  } = $props();

  const label = $derived(
    {
      workspace: ['Studio', 'Public', 'Open'],
      booking: ['Wed 28', '10:30', 'Meet'],
      activity: ['', '', 'Ready']
    }[scene][part]
  );
  const labelX = $derived(part === 0 || (scene === 'booking' && part === 1) ? 40 : 14);
</script>

<g fill="none" stroke="currentColor" stroke-linecap="butt" stroke-linejoin="miter">
  <g stroke-width="1" stroke-opacity="0.95">
    {#if scene === 'workspace' && part === 0}
      <circle cx="22" cy="20" r="9" />
    {/if}
    {#if scene === 'workspace' && part === 1}
      <g>
        {@render trailingMotion?.()}
        <rect height="18" rx="9" width="30" x="76" y="11" />
        <circle cx="97" cy="20" r="5.5">
          {@render thumbMotion?.()}
        </circle>
      </g>
    {/if}
    {#if scene === 'booking' && part === 0}
      <rect height="16" rx="2" width="16" x="14" y="12" />
    {/if}
    {#if scene === 'booking' && part === 1}<circle cx="22" cy="20" r="8" />{/if}
    {#if scene === 'booking' && part === 2}
      <rect height="12" rx="2" width="14" x="86" y="14" />
      <path d="m100 18 7-4v12l-7-4" />
    {/if}
    {#if scene === 'activity' && part === 0}
      <circle cx="24" cy="24" r="12" />
    {/if}
  </g>
  <g opacity="0.5" stroke-width="1" stroke-opacity="0.65">
    {#if scene === 'workspace' && part === 0}<path d="M18 20h8 M22 16v8" />{/if}
    {#if scene === 'workspace' && part === 2}
      <g>
        {@render trailingMotion?.()}
        <path d="M86 20h16 m-4.24-4.24L102 20l-4.24 4.24" />
      </g>
    {/if}
    {#if scene === 'booking' && part === 0}
      <path d="M14 17h16 M18 10v5 M26 10v5 M18 21h4 M18 24h8" />
    {/if}
    {#if scene === 'booking' && part === 1}<path d="M22 15v5l4 2" />{/if}
    {#if scene === 'activity' && part === 0}
      <circle cx="24" cy="20" r="3.5" />
      <path d="M17 31a7 7 0 0 1 14 0" />
    {/if}
    {#if scene === 'activity' && part === 2}<path d="m12 16 3 3 6-6" />{/if}
  </g>
  {#if scene === 'activity'}
    <g fill="currentColor" stroke="none">
      {#if part === 1}
        <text font-size="11" opacity="0.76" x="12" y="20">New reply</text>
        <text font-size="10" opacity="0.52" x="12" y="35">Maya · just now</text>
      {/if}
      {#if part === 2}
        <text font-size="11" opacity="0.76" x="27" y="20">Ready</text>
      {/if}
    </g>
  {:else}
    <text fill="currentColor" font-size="11" opacity="0.76" stroke="none" x={labelX} y="24">
      {label}
    </text>
  {/if}
</g>
