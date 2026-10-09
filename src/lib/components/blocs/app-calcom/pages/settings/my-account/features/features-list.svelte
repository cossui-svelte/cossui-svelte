<script lang="ts">
  import { toastManager } from '#lib/components/ui/toast/index.js';
  import {
    ToggleGroup,
    ToggleGroupItem,
    ToggleGroupSeparator
  } from '#lib/components/ui/toggle-group/index.js';

  interface Feature {
    slug: string;
    name: string;
    description: string;
  }

  type FeatureState = 'disabled' | 'enabled' | 'inherit';

  const features: Feature[] = [
    {
      description: 'Try the redesigned bookings page with improved navigation and filtering.',
      name: 'New bookings experience',
      slug: 'bookings-v3'
    }
  ];

  let featureStates = $state<Record<string, FeatureState>>({
    'bookings-v3': 'inherit'
  });

  function handleFeatureChange(slug: string, values: readonly string[]) {
    const newValue = values[0];
    if (!newValue) return;
    featureStates[slug] = newValue as FeatureState;
    toastManager.add({
      title: 'Settings updated successfully',
      type: 'success'
    });
  }
</script>

<div class="space-y-6">
  {#each features as feature (feature.slug)}
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="font-medium text-sm">{feature.name}</p>
        <p class="text-muted-foreground text-sm">{feature.description}</p>
      </div>
      <ToggleGroup
        class="shrink-0"
        onValueChange={(values: string[]) => handleFeatureChange(feature.slug, values)}
        value={[featureStates[feature.slug] ?? 'inherit']}
        variant="outline"
      >
        <ToggleGroupItem aria-label="Off" value="disabled">Off</ToggleGroupItem>
        <ToggleGroupSeparator />
        <ToggleGroupItem aria-label="On" value="enabled">On</ToggleGroupItem>
        <ToggleGroupSeparator />
        <ToggleGroupItem aria-label="Default" value="inherit">Default</ToggleGroupItem>
      </ToggleGroup>
    </div>
  {/each}
</div>
