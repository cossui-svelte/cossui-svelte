<script lang="ts">
  import PageHeader from '$lib/components/app/page-header.svelte';
  import PageHeaderDescription from '$lib/components/app/page-header-description.svelte';
  import PageHeaderHeading from '$lib/components/app/page-header-heading.svelte';
  import { Button } from '$lib/components/ui/button';
</script>

<div class="container w-full">
  <PageHeader>
    <PageHeaderHeading>BLOCS</PageHeaderHeading>
    <PageHeaderDescription>
      Reusable, ready-made parts of your application, available in just a few clicks.
    </PageHeaderDescription>
  </PageHeader>

  <Button class="rounded-full">Authentication</Button>
  <Button class="rounded-full">Dashboards</Button>
  <Button class="rounded-full">Landing</Button>
  <Button class="rounded-full">Sidebar</Button>
  <Button class="rounded-full">SignUp</Button>
</div>
