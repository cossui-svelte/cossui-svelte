<script lang="ts">
  import QrCode from "@lucide/svelte/icons/qr-code";
  import { Button } from "$lib/components/ui/button";
  import { Group, GroupSeparator } from "$lib/components/ui/group";
</script>

<Group>
  <Button aria-label="QR code" size="icon">
    <QrCode aria-hidden="true" />
  </Button>
  <GroupSeparator class="bg-primary/72" />
  <Button>Sign in</Button>
</Group>
