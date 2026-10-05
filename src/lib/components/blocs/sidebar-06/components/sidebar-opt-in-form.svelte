<script lang="ts">
  import { Button } from '#lib/components/ui/button/index.js';
  import {
    Card,
    CardDescription,
    CardHeader,
    CardPanel,
    CardTitle
  } from '#lib/components/ui/card/index.js';
  import { SidebarInput } from '#lib/components/ui/sidebar/index.js';
</script>

<Card class="gap-2 py-4 shadow-none">
  <CardHeader class="px-4">
    <CardTitle class="text-sm">Subscribe to our newsletter</CardTitle>
    <CardDescription>Opt-in to receive updates and news about the sidebar.</CardDescription>
  </CardHeader>
  <CardPanel class="px-4">
    <form>
      <div class="grid gap-2.5">
        <SidebarInput type="email" placeholder="Email" />
        <Button
          class="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none"
          size="sm"
        >
          Subscribe
        </Button>
      </div>
    </form>
  </CardPanel>
</Card>
