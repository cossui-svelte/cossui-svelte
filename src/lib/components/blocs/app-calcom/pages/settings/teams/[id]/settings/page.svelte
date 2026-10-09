<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    Card,
    CardFrame,
    CardFrameDescription,
    CardFrameFooter,
    CardFrameHeader,
    CardFrameTitle,
    CardPanel
  } from '#lib/components/ui/card/index.js';
  import { Field, FieldDescription, FieldLabel } from '#lib/components/ui/field/index.js';
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue
  } from '#lib/components/ui/select/index.js';
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../../components/app-header/index.js';
  import { FieldGrid, SettingsToggle } from '../../../../../components/particles/index.js';

  let { params: _params }: { params?: Record<string, string> } = $props();

  const resetIntervalItems = [
    { label: 'Daily', value: 'daily' },
    { label: 'Monthly', value: 'monthly' }
  ];

  const distributionBasisItems = [
    { label: 'Booking creation time', value: 'booking-creation-time' },
    { label: 'Meeting start time', value: 'event-start-time' }
  ];

  let resetInterval = $state('monthly');
  let distributionBasis = $state('booking-creation-time');
</script>

<AppHeader>
  <AppHeaderContent title="Settings">
    <AppHeaderDescription>Manage settings for your team</AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<div class="flex flex-col gap-4">
  <SettingsToggle
    description="Limit how many times members can be booked across all team event types"
    title="Limit booking frequency"
  />

  <SettingsToggle
    checked
    description="Allows your team Owners/Admins to temporarily sign in as you."
    title="User impersonation"
  />

  <SettingsToggle
    description="Your team members won't be able to see other team members when this is turned on."
    title="Make team private"
  />

  <SettingsToggle
    description="Create presets for internal notes that can be applied to bookings"
    title="Internal cancellation notes presets"
  />

  <CardFrame>
    <CardFrameHeader>
      <CardFrameTitle>Round robin</CardFrameTitle>
      <CardFrameDescription>
        Customize the default round robin settings for this team
      </CardFrameDescription>
    </CardFrameHeader>

    <Card class="rounded-b-none!">
      <CardPanel>
        <FieldGrid>
          <Field>
            <FieldLabel>Reset interval for weighted Round Robin</FieldLabel>
            <Select
              items={resetIntervalItems}
              value={resetInterval}
              onValueChange={(value: string) => value && (resetInterval = value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectPopup>
                {#each resetIntervalItems as { label, value } (value)}
                  <SelectItem {value}>{label}</SelectItem>
                {/each}
              </SelectPopup>
            </Select>
            <FieldDescription>
              Determines how often the round robin booking count resets to ensure balanced
              distribution.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Distribution basis for weighted Round Robin</FieldLabel>
            <Select
              items={distributionBasisItems}
              value={distributionBasis}
              onValueChange={(value: string) => value && (distributionBasis = value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectPopup>
                {#each distributionBasisItems as { label, value } (value)}
                  <SelectItem {value}>{label}</SelectItem>
                {/each}
              </SelectPopup>
            </Select>
            <FieldDescription>
              Determines which event timestamp is used as the basis for weighted round robin
              distribution.
            </FieldDescription>
          </Field>
        </FieldGrid>
      </CardPanel>
    </Card>

    <CardFrameFooter class="flex justify-end">
      <Button disabled>Update</Button>
    </CardFrameFooter>
  </CardFrame>
</div>
