<svelte:options namespace="svg" />

<script lang="ts" module>
  import type { AssemblyScene } from './particles-assembly-content.svelte';
  import type { AssemblyAxis, AssemblyPart, ModuleGeometry } from './particles-assembly-geometry';

  export const particlesSequenceDuration = 16.2;
  type Part = AssemblyPart;
  type Frame = readonly [number, string | number];
  type MotionMode = 'spline' | 'linear' | 'discrete';
  type Assembly = {
    scene: AssemblyScene;
    axis: AssemblyAxis;
    unit: number;
    labels: readonly [string, string, string];
    modules: readonly [ModuleGeometry, ModuleGeometry, ModuleGeometry];
    frame: {
      x: number;
      y: number;
      width: number;
      height: number;
      radius: number;
    };
  };
</script>

<script lang="ts">
  import BlueprintDrawing from './blueprint-drawing.svelte';
  import AssemblyContent from './particles-assembly-content.svelte';
  import {
    type Corner,
    type Edge,
    jointDuration,
    jointNeighbor,
    jointTime,
    outlineAt,
    outlineTimes,
    travel
  } from './particles-assembly-geometry';
  import { secondaryLine } from './primitives-morph-style';

  const chapterDuration = particlesSequenceDuration / 3;
  const parts = [0, 1, 2] as const;
  const edges: Edge[] = ['top', 'right', 'bottom', 'left'];
  const corners: Corner[] = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'];
  const assemblies: Assembly[] = [
    {
      scene: 'workspace',
      axis: 'vertical',
      unit: 40,
      labels: ['Identity', 'Visibility', 'Action'],
      modules: [
        { width: 120, targetWidth: 240, height: 40, radius: 8, x: 160, y: 224 },
        { width: 120, targetWidth: 240, height: 40, radius: 8, x: 160, y: 264 },
        { width: 120, targetWidth: 240, height: 40, radius: 8, x: 160, y: 304 }
      ],
      frame: { x: 160, y: 224, width: 240, height: 120, radius: 8 }
    },
    {
      scene: 'booking',
      axis: 'horizontal',
      unit: 40,
      labels: ['Date', 'Time', 'Meeting'],
      modules: [
        { width: 120, height: 40, radius: 8, x: 100, y: 264 },
        { width: 120, height: 40, radius: 8, x: 220, y: 264 },
        { width: 120, height: 40, radius: 8, x: 340, y: 264 }
      ],
      frame: { x: 100, y: 264, width: 360, height: 40, radius: 8 }
    },
    {
      scene: 'activity',
      axis: 'horizontal',
      unit: 24,
      labels: ['Avatar', 'Message', 'Status'],
      modules: [
        { width: 48, height: 48, radius: 8, x: 148, y: 260 },
        { width: 144, height: 48, radius: 8, x: 196, y: 260 },
        { width: 72, height: 32, targetHeight: 48, radius: 16, x: 340, y: 260 }
      ],
      frame: { x: 148, y: 260, width: 264, height: 48, radius: 8 }
    }
  ];

  // Upstream `Motion` component: builds the SMIL timing attributes for one
  // chapter, padded to span the whole looping sequence.
  function motionTiming(
    index: number,
    attributeName: string,
    frames: readonly Frame[],
    mode: MotionMode = 'spline'
  ) {
    const timeline = frames.map(
      ([time, value]) => [time + index * chapterDuration, value] as const
    );
    const first = timeline[0];
    const last = timeline[timeline.length - 1];
    if (!first || !last) return null;
    if (first[0] > 0) timeline.unshift([0, first[1]]);
    if (last[0] < particlesSequenceDuration) timeline.push([particlesSequenceDuration, last[1]]);
    return {
      attributeName,
      begin: '0s',
      dur: `${particlesSequenceDuration}s`,
      repeatCount: 'indefinite',
      calcMode: mode,
      keyTimes: timeline.map(([time]) => time / particlesSequenceDuration).join(';'),
      keySplines:
        mode === 'spline'
          ? timeline
              .slice(1)
              .map(() => '0.4 0 0.2 1')
              .join(';')
          : undefined,
      values: timeline.map(([, value]) => value).join(';')
    };
  }

  function widthDimension(left: number, right: number, y: number) {
    const center = (left + right) / 2;
    return `M${left} ${y - 8}V${y + 8} M${right} ${y - 8}V${y + 8} M${left} ${y}H${center - 16} M${center + 16} ${y}H${right} M${left - 4} ${y + 4}l8-8 M${right - 4} ${y + 4}l8-8`;
  }
</script>

{#snippet motion(
  index: number,
  attributeName: string,
  frames: readonly Frame[],
  mode: MotionMode = 'spline'
)}
  {@const timing = motionTiming(index, attributeName, frames, mode)}
  {#if timing}
    {#if attributeName === 'transform'}
      <animateTransform {...timing} type="translate" />
    {:else}
      <animate {...timing} />
    {/if}
  {/if}
{/snippet}

{#snippet fragmentOutline(assembly: Assembly, index: number, part: Part)}
  {@const times = outlineTimes(assembly.modules, assembly.axis, part)}
  {@const geometry = times.map((time) => outlineAt(assembly.modules, assembly.axis, part, time))}
  {@const initial = outlineAt(assembly.modules, assembly.axis, part, 0)}
  <g
    data-fragment-outline={part}
    stroke-width="1"
    stroke-opacity="0.95"
    stroke-linecap="butt"
    stroke-linejoin="miter"
  >
    {#each edges as edge (edge)}
      {@const neighbor = jointNeighbor(assembly.axis, part, edge)}
      <!-- Only the facing strokes merge. The exterior corner arcs keep their weight. -->
      {@const ownsDivider = edge === 'bottom' || edge === 'right'}
      {@const contact = neighbor === undefined ? undefined : jointTime(part, neighbor)}
      <path data-edge={edge} d={initial[edge]}>
        {@render motion(
          index,
          'd',
          times.map((time, i) => [time, geometry[i]?.[edge] ?? initial[edge]] as const),
          'linear'
        )}
        {#if contact !== undefined}
          {@render motion(
            index,
            'opacity',
            ownsDivider
              ? [
                  [0, 1],
                  [contact, 1],
                  [contact + jointDuration, 0.5]
                ]
              : [
                  [0, 1],
                  [contact - 0.08, 1],
                  [contact, 0]
                ]
          )}
          {@render motion(index, 'stroke-opacity', [
            [0, 0.95],
            [contact, 0.95],
            [contact + jointDuration, 0.65]
          ])}
        {/if}
      </path>
    {/each}
    {#each corners as corner (corner)}
      <path data-corner={corner} d={initial[corner]}>
        {@render motion(
          index,
          'd',
          times.map((time, i) => [time, geometry[i]?.[corner] ?? initial[corner]] as const),
          'linear'
        )}
      </path>
    {/each}
  </g>
{/snippet}

{#snippet fragment(assembly: Assembly, index: number, part: Part)}
  {@const scene = assembly.scene}
  {@const module = assembly.modules[part]}
  {@const sourceX = 140 + part * 140 - module.width / 2}
  {@const sourceY = 124 - module.height / 2}
  {@const { start, end } = travel(part)}
  {@const grows = module.targetWidth !== undefined}
  <rect
    data-source-ghost={part}
    x={sourceX}
    y={sourceY}
    width={module.width}
    height={module.height}
    rx={module.radius}
    opacity="0"
    stroke-width="1"
    stroke-opacity="0.65"
    stroke-dasharray="4 6"
  >
    {@render motion(index, 'opacity', [
      [0, 0],
      [start, 0],
      [start + 0.12, 0.32]
    ])}
  </rect>
  <g data-particle={part} transform={`translate(${sourceX} ${sourceY})`}>
    {@render motion(index, 'transform', [
      [0, `${sourceX} ${sourceY}`],
      [start, `${sourceX} ${sourceY}`],
      [end, `${module.x} ${module.y}`]
    ])}
    {@render fragmentOutline(assembly, index, part)}
    <g>
      {#if module.targetHeight !== undefined}
        {@render motion(index, 'transform', [
          [0, '0 0'],
          [start, '0 0'],
          [end, `0 ${(module.targetHeight - module.height) / 2}`]
        ])}
      {/if}
      {#snippet trailingMotion()}
        {@render motion(index, 'transform', [
          [0, '0 0'],
          [start, '0 0'],
          [end, `${(module.targetWidth ?? module.width) - module.width} 0`]
        ])}
      {/snippet}
      {#snippet thumbMotion()}
        {@render motion(index, 'cx', [
          [0, 97],
          [3, 97],
          [3.25, 85]
        ])}
      {/snippet}
      <AssemblyContent
        {scene}
        {part}
        trailingMotion={grows ? trailingMotion : undefined}
        thumbMotion={scene === 'workspace' ? thumbMotion : undefined}
      />
    </g>
  </g>
{/snippet}

{#snippet receiver(assembly: Assembly, index: number)}
  <g data-receiver="" stroke-dasharray="4 6" stroke-width="1" stroke-opacity="0.65">
    {#each parts as part (part)}
      {@const module = assembly.modules[part]}
      {@const final = outlineAt(assembly.modules, assembly.axis, part, chapterDuration)}
      {@const { end } = travel(part)}
      <g transform={`translate(${module.x} ${module.y})`} opacity="0.38">
        {@render motion(index, 'opacity', [
          [0, 0.38],
          [end - 0.1, 0.38],
          [end, 0]
        ])}
        {#each edges.filter((edge) => jointNeighbor(assembly.axis, part, edge) === undefined) as edge (edge)}
          <path d={final[edge]} />
        {/each}
        {#each corners as corner (corner)}
          <path d={final[corner]} />
        {/each}
      </g>
    {/each}
  </g>
{/snippet}

{#snippet measurements(assembly: Assembly, index: number)}
  {@const frame = assembly.frame}
  {@const right = frame.x + frame.width}
  {@const bottom = frame.y + frame.height}
  {@const cx = frame.x + frame.width / 2}
  {@const cy = frame.y + frame.height / 2}
  {@const dy = bottom + 32}
  <g data-measurements="assembly" opacity="0">
    {@render motion(index, 'opacity', [
      [0, 0],
      [2.35, 0],
      [2.55, 1]
    ])}
    <path {...secondaryLine} d={widthDimension(frame.x, right, dy)} />
    <path
      {...secondaryLine}
      d={`M${right + 10} ${frame.y}H${right + 42} M${right + 10} ${bottom}H${right + 42} M${right + 34} ${frame.y}V${cy - 10} M${right + 34} ${cy + 10}V${bottom} M${right + 30} ${frame.y + 4}l8-8 M${right + 30} ${bottom + 4}l8-8`}
    />
    <g fill="currentColor" font-size="10" opacity="0.58" stroke="none" text-anchor="middle">
      <text x={right + 34} y={cy + 3}>{frame.height / assembly.unit}u</text>
      <text x={cx} y={dy + 3}>{frame.width / assembly.unit}u</text>
      <text x="280" y="428">A + B + C</text>
    </g>
  </g>
{/snippet}

{#snippet construction(assembly: Assembly)}
  {@const { frame, scene, modules } = assembly}
  {@const left = scene === 'workspace' ? 140 : frame.x - 20}
  {@const right = scene === 'workspace' ? 420 : frame.x + frame.width + 20}
  {@const top = frame.y - 20}
  {@const bottom = frame.y + frame.height + 20}
  <g data-construction="source-grid" opacity="0.08" stroke-width="1" stroke-opacity="0.6">
    <path d="M68 84H492 M68 164H492" />
    {#each modules as module, part (part)}
      {@const x = 140 + part * 140 - module.width / 2}
      {#each [x, x + module.width / 2, x + module.width] as column (column)}
        <path d={`M${column} 76V92 M${column} 156V172`} />
      {/each}
    {/each}
  </g>
  <!-- Each field is fixed; all guides stop outside the assembled content. -->
  <g data-construction="assembly-grid" opacity="0.08" stroke-width="1" stroke-opacity="0.6">
    <path d={`M${left} ${top}H${right}V${bottom}H${left}Z`} />
    {#each Array.from({ length: Math.floor(frame.width / assembly.unit) + 1 }, (_, i) => frame.x + i * assembly.unit) as x (x)}
      <path d={`M${x} ${top - 8}V${top + 8} M${x} ${bottom - 8}V${bottom + 8}`} />
    {/each}
    <path
      d={`M${left - 8} ${frame.y}H${left + 12} M${right - 12} ${frame.y}H${right + 8} M${left - 8} ${bottom - 20}H${left + 12} M${right - 12} ${bottom - 20}H${right + 8}`}
    />
  </g>
  <g opacity="0.32" stroke-width="1" stroke-opacity="0.65">
    {#each [140, 280, 420] as x (x)}
      <g>
        <path d={`M${x} 198V176`} stroke-dasharray="3 5" />
        <path d={`M${x - 4.24} 193.76L${x} 198l4.24-4.24`} />
      </g>
    {/each}
  </g>
  <path
    {...secondaryLine}
    d={`M56 84h12 M62 78v12 M${right + 6} ${bottom}h12 M${right + 12} ${bottom - 6}v12`}
  />
  <g fill="currentColor" font-size="10" opacity="0.58" stroke="none" text-anchor="middle">
    {#each assembly.labels as label, part (label)}
      <text x={140 + part * 140} y="64">{String.fromCharCode(65 + part)} / {label}</text>
    {/each}
  </g>
{/snippet}

<BlueprintDrawing>
  {#each assemblies as assembly, index (assembly.scene)}
    <g data-assembly-scene={assembly.scene} opacity="0">
      {@render motion(index, 'opacity', [
        [0, 0],
        [0.16, 1],
        [4.95, 1],
        [5.35, 0]
      ])}
      {@render construction(assembly)}
      {@render receiver(assembly, index)}
      {#each parts as part (part)}
        {@render fragment(assembly, index, part)}
      {/each}
      {@render measurements(assembly, index)}
    </g>
  {/each}
</BlueprintDrawing>
