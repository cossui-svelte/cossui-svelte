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
  } from '../../../../../components/app-header/index.js';
  import { SettingsToggle } from '../../../../../components/particles/index.js';
  import BookingThemeSection from '../../../my-account/appearance/appearance-form.svelte';
  import CustomBrandColorsSection from '../../../my-account/appearance/custom-brand-colors-section.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<AppHeader>
  <AppHeaderContent title="Appearance">
    <AppHeaderDescription>Manage settings for your team appearance</AppHeaderDescription>
  </AppHeaderContent>
</AppHeader>
<div class="flex flex-col gap-4">
  <CardFrame>
    <CardFrameHeader>
      <CardFrameTitle>Booking page theme</CardFrameTitle>
      <CardFrameDescription>This only applies to your public booking pages</CardFrameDescription>
    </CardFrameHeader>

    <Card class="rounded-b-none!">
      <CardPanel>
        <BookingThemeSection />
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
