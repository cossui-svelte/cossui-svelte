<script context="module">
    let uid = 0;

    export function useId() {
        return `id-${uid++}`;
    }
</script>

<script>
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";

    const id = useId();
</script>

<div class="flex flex-col items-start gap-2">
    <Label for={id}>Email</Label>
    <Input aria-label="Email" {id} placeholder="you@example.com" type="email" />
</div>
