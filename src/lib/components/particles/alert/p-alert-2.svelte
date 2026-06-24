<script lang="ts">
  import Info from "@lucide/svelte/icons/info";
  import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "$lib/components/ui/alert";
</script>

<Alert>
  <Info />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>Describe what can be done about it here.</AlertDescription>
</Alert>
