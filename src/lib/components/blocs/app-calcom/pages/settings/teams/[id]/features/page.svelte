<script lang="ts">
  import { Card, CardFrame, CardPanel } from '#lib/components/ui/card/index.js';
  import { toastManager } from '#lib/components/ui/toast/index.js';
  import {
    ToggleGroup,
    ToggleGroupItem,
    ToggleGroupSeparator
  } from '#lib/components/ui/toggle-group/index.js';
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../../components/app-header/index.js';
  import { SettingsToggle } from '../../../../../components/particles/index.js';

  let { params: _params }: { params?: Record<string, string> } = $props();

  type EnhancedBookingsState = 'disabled' | 'enabled' | 'inherit';

  let enhancedBookings = $state<EnhancedBookingsState>('inherit');
  let autoOptIn = $state(false);

  function handleEnhancedBookingsChange(values: readonly string[]) {
    const newValue = values[0] as EnhancedBookingsState | undefined;
    if (!newValue) return;
    enhancedBookings = newValue;
    toastManager.add({ title: 'Settings updated successfully', type: 'success' });
  }

  function handleAutoOptInChange(checked: boolean) {
    autoOptIn = checked;
    toastManager.add({ title: 'Settings updated successfully', type: 'success' });
  }
</script>

<AppHeader>
  <AppHeaderContent title="Features">
    <AppHeaderDescription>Manage experimental features for your team</AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<div class="flex flex-col gap-4">
  <CardFrame>
    <Card>
      <CardPanel>
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="font-medium text-sm">Enhanced bookings</p>
            <p class="text-muted-foreground text-sm">
              A redesigned booking page including a calendar view.
            </p>
          </div>
          <ToggleGroup
            class="shrink-0"
            onValueChange={handleEnhancedBookingsChange}
            value={[enhancedBookings]}
            variant="outline"
          >
            <ToggleGroupItem aria-label="Disable" value="disabled">Disable</ToggleGroupItem>
            <ToggleGroupSeparator />
            <ToggleGroupItem aria-label="Enable" value="enabled">Enable</ToggleGroupItem>
            <ToggleGroupSeparator />
            <ToggleGroupItem aria-label="Let users decide" value="inherit">
              Let users decide
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardPanel>
    </Card>
  </CardFrame>

  <SettingsToggle
    checked={autoOptIn}
    description="Automatically opt team members into new experimental features, unless configured by the organization or opted out by members"
    onCheckedChange={handleAutoOptInChange}
    title="Automatically opt-in for future experimental features"
  />
</div>
