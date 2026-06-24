<script lang="ts">
  import CircleAlert from "@lucide/svelte/icons/circle-alert";
  import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "$lib/components/ui/alert";
</script>

<Alert variant="error">
  <CircleAlert />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>Describe what can be done about it here.</AlertDescription>
</Alert>
