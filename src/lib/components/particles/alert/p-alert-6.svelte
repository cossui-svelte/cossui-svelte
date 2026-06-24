<script lang="ts">
  import TriangleAlert from "@lucide/svelte/icons/triangle-alert";
  import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "$lib/components/ui/alert";
</script>

<Alert variant="warning">
  <TriangleAlert />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>Describe what can be done about it here.</AlertDescription>
</Alert>
