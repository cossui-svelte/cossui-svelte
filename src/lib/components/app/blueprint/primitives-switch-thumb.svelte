<svelte:options namespace="svg" />

<script lang="ts">
  import { secondaryLine } from './primitives-morph-style';
  import {
    morphCycleDuration as duration,
    morphKeyTimes as keyTimes
  } from './primitives-morph-timing';

  const radiusEndpoint = -60 / Math.sqrt(2);
</script>

<g data-construction="switch-thumb" opacity="0">
  <animate
    attributeName="opacity"
    begin="0s"
    calcMode="linear"
    dur={`${duration}s`}
    keyTimes={keyTimes(0, 5.42, 5.6, 8.6, 8.8, duration)}
    repeatCount="indefinite"
    values="0;0;1;1;0;0"
  />
  <g transform="translate(204 204)">
    <!-- Geometry resets after the whole thumb is hidden. -->
    <animateTransform
      attributeName="transform"
      begin="0s"
      calcMode="spline"
      dur={`${duration}s`}
      keySplines="0 0 1 1;0.4 0 0.2 1;0 0 1 1;0 0 1 1;0 0 1 1"
      keyTimes={keyTimes(0, 6.9, 7.4, 8.82, 8.86, duration)}
      repeatCount="indefinite"
      type="translate"
      values="204 204;204 204;364 204;364 204;204 204;204 204"
    />
    <circle fill="none" r="80" stroke-width="1" stroke-opacity="0.85">
      <animate
        attributeName="r"
        begin="0s"
        calcMode="spline"
        dur={`${duration}s`}
        keySplines="0 0 1 1;0.4 0 0.2 1;0 0 1 1;0 0 1 1;0 0 1 1"
        keyTimes={keyTimes(0, 5.6, 6.4, 8.82, 8.86, duration)}
        repeatCount="indefinite"
        values="80;80;60;60;80;80"
      />
    </circle>
    <g opacity="0">
      <animate
        attributeName="opacity"
        begin="0s"
        calcMode="linear"
        dur={`${duration}s`}
        keyTimes={keyTimes(0, 7.4, 7.58, 8.82, 8.86, duration)}
        repeatCount="indefinite"
        values="0;0;1;1;0;0"
      />
      <path
        {...secondaryLine}
        d={`M0 0L${radiusEndpoint} ${radiusEndpoint} M${radiusEndpoint - 3} ${radiusEndpoint + 3}l6-6`}
      />
      <text
        fill="currentColor"
        font-size="10"
        opacity="0.58"
        stroke="none"
        text-anchor="middle"
        transform="rotate(45 -23 -34)"
        x="-23"
        y="-34">1.5u</text
      >
    </g>
  </g>
</g>
