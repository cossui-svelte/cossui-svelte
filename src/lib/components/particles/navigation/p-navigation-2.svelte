<script lang="ts">
  import {
    segmentedControlItemVariants,
    segmentedControlRootClassName
  } from '$lib/components/ui/tabs/segmented-control';

  const itemClassName = segmentedControlItemVariants({ size: 'sm', state: 'current' });
</script>

<nav aria-label="Project sections">
  <div class={segmentedControlRootClassName}>
    <a aria-current="page" class={itemClassName} href="#overview">Overview</a>
    <a class={itemClassName} href="#activity">Activity</a>
    <a class={itemClassName} href="#settings">Settings</a>
  </div>
</nav>
