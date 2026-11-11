<svelte:options namespace="svg" />

<script lang="ts">
  import { secondaryLine } from './primitives-morph-style';
  import { morphCycleDuration as duration } from './primitives-morph-timing';

  type Timing = { start: number; end: number };

  const circleToCapsule = { start: 2.4, end: 3.2 };
  const buttonToCard = { start: 12, end: 12.8 };

  const corners = [
    { id: 'top-right', x: 1, y: -1 },
    { id: 'bottom-right', x: 1, y: 1 },
    { id: 'bottom-left', x: -1, y: 1 },
    { id: 'top-left', x: -1, y: -1 }
  ] as const;

  function visibilityKeyTimes({ start, end }: Timing) {
    return [0, start - 0.18, start, end, end + 0.18, duration]
      .map((time) => time / duration)
      .join(';');
  }

  function motionKeyTimes({ start, end }: Timing) {
    return [0, start, end, end + 0.2, end + 0.24, duration]
      .map((time) => time / duration)
      .join(';');
  }
</script>

{#snippet transitionVisibility(timing: Timing)}
  <animate
    attributeName="opacity"
    begin="0s"
    calcMode="linear"
    dur={`${duration}s`}
    keyTimes={visibilityKeyTimes(timing)}
    repeatCount="indefinite"
    values="0;0;1;1;0;0"
  />
{/snippet}

{#snippet transitionMotion(
  timing: Timing,
  attributeName: string,
  from: string | number,
  to: string | number
)}
  <animate
    {attributeName}
    begin="0s"
    calcMode="spline"
    dur={`${duration}s`}
    keySplines="0 0 1 1;0.4 0 0.2 1;0 0 1 1;0 0 1 1;0 0 1 1"
    keyTimes={motionKeyTimes(timing)}
    repeatCount="indefinite"
    values={[from, from, to, to, from, from].join(';')}
  />
{/snippet}

<g>
  <g data-transition="circle-to-capsule" opacity="0">
    {@render transitionVisibility(circleToCapsule)}
    <g opacity="0.3" stroke-dasharray="4 4" stroke-width="1" stroke-opacity="0.65">
      {#each [204, 364] as center (center)}
        <circle cx="284" cy="204" r="120">
          {@render transitionMotion(circleToCapsule, 'cx', 284, center)}
          {@render transitionMotion(circleToCapsule, 'r', 120, 80)}
        </circle>
      {/each}
    </g>
    <g {...secondaryLine}>
      {#each [204, 364] as center (center)}
        <circle cx="284" cy="204" r="3">
          {@render transitionMotion(circleToCapsule, 'cx', 284, center)}
        </circle>
      {/each}
    </g>
  </g>
  <g data-transition="button-to-card" opacity="0">
    {@render transitionVisibility(buttonToCard)}
    <g opacity="0.3" stroke-dasharray="4 4" stroke-width="1" stroke-opacity="0.65">
      {#each corners as { id, x, y } (id)}
        <circle cx={284 + x * 136} cy={204 + y * 56} r="24">
          {@render transitionMotion(buttonToCard, 'cx', 284 + x * 136, 284 + x * 80)}
          {@render transitionMotion(buttonToCard, 'cy', 204 + y * 56, 204 + y * 80)}
          {@render transitionMotion(buttonToCard, 'r', 24, 40)}
        </circle>
      {/each}
    </g>
    <g {...secondaryLine}>
      {#each corners as { id, x, y } (id)}
        <circle cx={284 + x * 136} cy={204 + y * 56} r="2.5">
          {@render transitionMotion(buttonToCard, 'cx', 284 + x * 136, 284 + x * 80)}
          {@render transitionMotion(buttonToCard, 'cy', 204 + y * 56, 204 + y * 80)}
        </circle>
      {/each}
    </g>
  </g>
</g>
