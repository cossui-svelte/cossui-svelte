<script>
    import SuperDebug from "sveltekit-superforms";
    let { formData } = $props();
</script>

<SuperDebug data={$formData} />
