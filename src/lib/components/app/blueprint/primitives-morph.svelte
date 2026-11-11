<script lang="ts">
  import BlueprintDrawing from './blueprint-drawing.svelte';
  import MorphDetails, { morphDetailIds } from './primitives-morph-details.svelte';
  import { secondaryLine } from './primitives-morph-style';
  import {
    morphCycleDuration,
    morphHoldDuration,
    morphKeyTimes,
    morphStageDuration
  } from './primitives-morph-timing';
  import PrimitivesMorphTransitions from './primitives-morph-transitions.svelte';
  import SliderGridMask from './primitives-slider-grid-mask.svelte';
  import SwitchThumb from './primitives-switch-thumb.svelte';

  let { paused }: { paused: boolean } = $props();

  type Shape = { width: number; height: number; corner: number };

  // All stages share four straight edges and four cubic corners, including the
  // circle’s zero-length edges. Matching topology keeps every point continuous.
  function construct({ width, height, corner: r }: Shape) {
    const left = 284 - width / 2;
    const right = 284 + width / 2;
    const top = 204 - height / 2;
    const bottom = 204 + height / 2;
    const a = r * 0.55228475;
    const guideGapStart = height < 40 ? 298 : 348;
    const guideGapEnd = height < 40 ? 320 : 348;
    const points = {
      'top-left': [left + r, top],
      'top-right': [right - r, top],
      'right-top': [right, top + r],
      'right-bottom': [right, bottom - r],
      'bottom-right': [right - r, bottom],
      'bottom-left': [left + r, bottom],
      'left-bottom': [left, bottom - r],
      'left-top': [left, top + r]
    } as const;
    return {
      points,
      showHeight: height >= 40 ? 1 : 0,
      outline: `M${left + r} ${top} L${right - r} ${top}
      C${right - r + a} ${top} ${right} ${top + r - a} ${right} ${top + r}
      L${right} ${bottom - r}
      C${right} ${bottom - r + a} ${right - r + a} ${bottom} ${right - r} ${bottom}
      L${left + r} ${bottom}
      C${left + r - a} ${bottom} ${left} ${bottom - r + a} ${left} ${bottom - r}
      L${left} ${top + r}
      C${left} ${top + r - a} ${left + r - a} ${top} ${left + r} ${top} Z`,
      // Each extension has one guide owner; measurement marks do not retrace it.
      guides: `M${left} 38V${guideGapStart} M${left} ${guideGapEnd}V348
      M${right} 38V${guideGapStart} M${right} ${guideGapEnd}V348
      M${left - 24} ${top}H490 M${left - 24} ${bottom}H490
      M164 348V372 M204 348V372`,
      dimensions: `M${left} 46H264 M304 46H${right}
      M${left - 4} 50l8-8 M${right - 4} 50l8-8`,
      heightDimension: `M482 ${top}V190 M482 218V${bottom}
      M478 ${top + 4}l8-8 M478 ${bottom + 4}l8-8`
    };
  }

  const circle = construct({ width: 240, height: 240, corner: 120 });
  const pill = construct({ width: 320, height: 160, corner: 80 });
  const stages = [
    circle,
    pill,
    pill,
    construct({ width: 320, height: 160, corner: 24 }),
    construct({ width: 240, height: 240, corner: 40 }),
    construct({ width: 320, height: 12, corner: 6 }),
    circle
  ];

  // Every 3.2s: hold the finished form for 2.4s, then morph over 0.8s.
  // Repeated frames share the same SVG clock with their construction details.
  function morphKeySplines(values: (string | number)[]) {
    return values
      .slice(0, -1)
      .flatMap(() => ['0 0 1 1', '0.4 0 0.2 1'])
      .join(';');
  }

  function morphValueKeyTimes(values: (string | number)[]) {
    return morphKeyTimes(
      ...values.flatMap((_, index) =>
        index === values.length - 1
          ? [morphCycleDuration]
          : [index * morphStageDuration, index * morphStageDuration + morphHoldDuration]
      )
    );
  }

  function morphValues(values: (string | number)[]) {
    return values
      .flatMap((value, index) => (index === values.length - 1 ? [value] : [value, value]))
      .join(';');
  }

  const tangentIds = [
    'top-left',
    'top-right',
    'right-top',
    'right-bottom',
    'bottom-right',
    'bottom-left',
    'left-bottom',
    'left-top'
  ] as const;

  const gridPaths = [
    'M124 68V298 M124 320V348',
    'M164 68V240 M164 260V348',
    'M204 68V348',
    'M244 68V348',
    'M284 68V121 M284 142V298 M284 320V348',
    'M324 68V132 M324 163V348',
    'M364 68V348',
    'M404 68V348',
    'M444 68V298 M444 320V348',
    'M104 84H464',
    'M104 124H273 M295 124H464',
    'M104 164H172 M200 164H283 M354 164H464',
    'M104 204H374 M394 204H464',
    'M104 244H140 M168 244H464',
    'M104 284H464',
    'M104 324H464'
  ];

  const uid = $props.id();
  const hatchId = `${uid}-hatch`;
  const guideId = `${uid}-guide`;
  const gridMaskId = `${uid}-grid-mask`;

  let root = $state<HTMLDivElement | null>(null);
  let widthLabel = $state<SVGTextElement | null>(null);
  let heightLabel = $state<SVGTextElement | null>(null);

  $effect(() => {
    const isPaused = paused;
    const svg = root?.querySelector('svg');
    if (!svg) return;
    if (isPaused) svg.pauseAnimations();
    else svg.unpauseAnimations();

    const left = svg.querySelector<SVGCircleElement>('[data-anchor="left-bottom"]');
    const right = svg.querySelector<SVGCircleElement>('[data-anchor="right-top"]');
    const top = svg.querySelector<SVGCircleElement>('[data-anchor="top-left"]');
    const bottom = svg.querySelector<SVGCircleElement>('[data-anchor="bottom-right"]');
    const widthText = widthLabel;
    const heightText = heightLabel;
    let frame = 0;

    function updateMeasurements() {
      if (left && right && top && bottom) {
        // Read the animated anchor coordinates, so numerical labels use exactly
        // the same eased geometry as the SVG, including after pause/resume.
        const width = `${Number(((right.cx.animVal.value - left.cx.animVal.value) / 40).toFixed(1))}u`;
        const height = `${Number(((bottom.cy.animVal.value - top.cy.animVal.value) / 40).toFixed(1))}u`;
        if (widthText && widthText.textContent !== width) widthText.textContent = width;
        if (heightText && heightText.textContent !== height) heightText.textContent = height;
      }
      if (!isPaused) frame = requestAnimationFrame(updateMeasurements);
    }

    updateMeasurements();
    return () => cancelAnimationFrame(frame);
  });
</script>

{#snippet morph(attributeName: string, values: (string | number)[])}
  <animate
    {attributeName}
    calcMode="spline"
    dur={`${morphCycleDuration}s`}
    keySplines={morphKeySplines(values)}
    keyTimes={morphValueKeyTimes(values)}
    repeatCount="indefinite"
    values={morphValues(values)}
  />
{/snippet}

<div class="absolute inset-0" bind:this={root}>
  <BlueprintDrawing>
    <defs>
      <path d={circle.guides} id={guideId}>
        {@render morph(
          'd',
          stages.map((stage) => stage.guides)
        )}
      </path>
      <!-- Keep coincident grid lines from darkening the continuous guides. -->
      <mask
        height="440"
        id={gridMaskId}
        maskUnits="userSpaceOnUse"
        style="mask-type: luminance"
        width="560"
        x="0"
        y="0"
      >
        <rect fill="white" height="440" stroke="none" width="560" />
        <use href={`#${guideId}`} stroke="black" stroke-width="1.3" stroke-opacity="1" />
        <SliderGridMask />
      </mask>
      <!-- Origin at the circle center aligns a hatch line with its 45° radius. -->
      <pattern
        height="10"
        id={hatchId}
        patternTransform="translate(284 204)"
        patternUnits="userSpaceOnUse"
        width="10"
      >
        <path d="M0 10 10 0" opacity="0.27" stroke-width="1" stroke-opacity="0.65" />
      </pattern>
    </defs>
    <g mask={`url(#${gridMaskId})`} opacity="0.08" stroke-width="1" stroke-opacity="0.6">
      {#each gridPaths as d (d)}
        <path {d} />
      {/each}
    </g>
    <use href={`#${guideId}`} opacity="0.24" stroke-width="1" stroke-opacity="0.65" />
    <path {...secondaryLine} d={circle.dimensions}>
      {@render morph(
        'd',
        stages.map((stage) => stage.dimensions)
      )}
    </path>
    <g>
      {@render morph(
        'opacity',
        stages.map((stage) => stage.showHeight)
      )}
      <path {...secondaryLine} d={circle.heightDimension}>
        {@render morph(
          'd',
          stages.map((stage) => stage.heightDimension)
        )}
      </path>
    </g>
    <path d={circle.outline} stroke-width="1" stroke-opacity="1">
      {@render morph(
        'd',
        stages.map((stage) => stage.outline)
      )}
    </path>
    <g stroke-width="1" stroke-opacity="0.8">
      {@render morph(
        'opacity',
        stages.map((stage) => stage.showHeight)
      )}
      {#each tangentIds as id (id)}
        <circle data-anchor={id} cx={circle.points[id][0]} cy={circle.points[id][1]} r="2.5">
          {@render morph(
            'cx',
            stages.map((stage) => stage.points[id][0])
          )}
          {@render morph(
            'cy',
            stages.map((stage) => stage.points[id][1])
          )}
        </circle>
      {/each}
    </g>
    <PrimitivesMorphTransitions />
    {#each morphDetailIds as stage, index (stage)}
      <g data-construction={stage} opacity="0">
        <animate
          attributeName="opacity"
          begin={`${index * morphStageDuration}s`}
          dur={`${morphCycleDuration}s`}
          keyTimes={morphKeyTimes(0, 0.18, 2.2, morphHoldDuration, morphCycleDuration)}
          repeatCount="indefinite"
          values="0;1;1;0;0"
        />
        <MorphDetails {hatchId} {stage} />
      </g>
    {/each}
    <g fill="currentColor" font-size="10" opacity="0.52" stroke="none">
      <text bind:this={widthLabel} text-anchor="middle" x="284" y="49">6u</text>
      <g>
        {@render morph(
          'opacity',
          stages.map((stage) => stage.showHeight)
        )}
        <text bind:this={heightLabel} text-anchor="middle" x="482" y="207">6u</text>
      </g>
      <text text-anchor="middle" x="184" y="384">u</text>
    </g>
    <g {...secondaryLine}>
      <path d="M164 364H204 m-44 4 8-8 m32 8 8-8" />
      <path d="M76 82h12 M82 76v12 M470 340h12 M476 334v12 M278 204h12 M284 198v12" />
      <path d="M266 401h36 M284 395v12" />
    </g>
    <SwitchThumb />
  </BlueprintDrawing>
</div>
