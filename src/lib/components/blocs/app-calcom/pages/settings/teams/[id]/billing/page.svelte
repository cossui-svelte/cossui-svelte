<script lang="ts">
  import BillingPageContent from '../../../billing/billing-page-content.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<BillingPageContent />
