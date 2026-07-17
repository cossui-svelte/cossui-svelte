<script lang="ts">
	import { Dialog } from "bits-ui";

	let { ...restProps }: Dialog.PortalProps = $props();
</script>

<Dialog.Portal {...restProps} />
