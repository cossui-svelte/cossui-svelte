<script context="module">
    let uid = 0;

    export function useId() {
        return `id-${uid++}`;
    }
</script>

<script>
    import Input from "$lib/cossui-components/input/input.svelte";
    import Label from "$lib/cossui-components/label.svelte";

    const id = useId();
</script>

<div class="flex flex-col items-start gap-2">
    <Label for={id}>Email</Label>
    <Input aria-label="Email" {id} placeholder="you@example.com" type="email" />
</div>
