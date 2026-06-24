<script lang="ts">
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import { Button } from "$lib/components/ui/button";
  import { Group, GroupSeparator } from "$lib/components/ui/group";
</script>

<Group aria-label="Pagination">
  <Group aria-label="Page numbers">
    <Button class="min-w-8" variant="outline">1</Button>
    <GroupSeparator />
    <Button class="min-w-8" variant="outline">2</Button>
    <GroupSeparator />
    <Button class="min-w-8" variant="outline">3</Button>
    <GroupSeparator />
    <Button class="min-w-8" variant="outline">4</Button>
    <GroupSeparator />
    <Button class="min-w-8" variant="outline">5</Button>
  </Group>
  <Group aria-label="Navigation">
    <Button aria-label="Previous" size="icon" variant="outline">
      <ArrowLeft aria-hidden />
    </Button>
    <GroupSeparator />
    <Button aria-label="Next" size="icon" variant="outline">
      <ArrowRight aria-hidden />
    </Button>
  </Group>
</Group>
