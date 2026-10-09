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
  import {
    AppHeader,
    AppHeaderContent,
    AppHeaderDescription
  } from '../../../../components/app-header/index.js';
  import { SettingsToggle } from '../../../../components/particles/index.js';
  import AppearanceForm from './appearance-form.svelte';
  import BookingLayoutSection from './booking-layout-section.svelte';
  import CustomBrandColorsSection from './custom-brand-colors-section.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<AppHeader>
  <AppHeaderContent title="Appearance">
    <AppHeaderDescription>Manage settings for your booking appearance</AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<div class="flex flex-col gap-4">
  <CardFrame>
    <CardFrameHeader>
      <CardFrameTitle>Dashboard theme</CardFrameTitle>
      <CardFrameDescription>This only applies to your logged in dashboard</CardFrameDescription>
    </CardFrameHeader>

    <Card class="rounded-b-none!">
      <CardPanel>
        <AppearanceForm />
      </CardPanel>
    </Card>

    <CardFrameFooter class="flex justify-end">
      <Button disabled>Update</Button>
    </CardFrameFooter>
  </CardFrame>

  <CardFrame>
    <CardFrameHeader>
      <CardFrameTitle>Booking page theme</CardFrameTitle>
      <CardFrameDescription>This only applies to your public booking pages</CardFrameDescription>
    </CardFrameHeader>

    <Card class="rounded-b-none!">
      <CardPanel>
        <AppearanceForm />
      </CardPanel>
    </Card>

    <CardFrameFooter class="flex justify-end">
      <Button disabled>Update</Button>
    </CardFrameFooter>
  </CardFrame>

  <CardFrame>
    <CardFrameHeader>
      <CardFrameTitle>Booking layout</CardFrameTitle>
      <CardFrameDescription>
        You can select multiple and bookers can switch views. This can be overridden on a per event
        basis.
      </CardFrameDescription>
    </CardFrameHeader>

    <Card class="rounded-b-none!">
      <CardPanel>
        <BookingLayoutSection />
      </CardPanel>
    </Card>

    <CardFrameFooter class="flex justify-end">
      <Button disabled>Update</Button>
    </CardFrameFooter>
  </CardFrame>

  <CardFrame>
    <CardFrameHeader>
      <CardFrameTitle>Custom brand colors</CardFrameTitle>
      <CardFrameDescription>
        Customize your own brand colour into your booking page.
      </CardFrameDescription>
    </CardFrameHeader>

    <Card class="rounded-b-none!">
      <CardPanel>
        <CustomBrandColorsSection />
      </CardPanel>
    </Card>

    <CardFrameFooter class="flex justify-end">
      <Button disabled>Update</Button>
    </CardFrameFooter>
  </CardFrame>

  <SettingsToggle
    description="Removes any Cal.com related brandings, i.e. 'Powered by Cal.com.'"
    title="Disable Cal.com branding"
  />

  <SettingsToggle
    description="Hide book a team member button from your public pages."
    title="Hide book a team member button"
  />

  <SettingsToggle
    description="Hide the team profile link on booking pages"
    title="Hide team profile link"
  />
</div>
