<script lang="ts">
  import CircleCheck from "@lucide/svelte/icons/circle-check";
  import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "$lib/components/ui/alert";
</script>

<Alert variant="success">
  <CircleCheck />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>Describe what can be done about it here.</AlertDescription>
</Alert>
