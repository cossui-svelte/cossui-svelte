<script>
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { CheckboxGroup } from "$lib/components/ui/checkbox-group";
    import { Label } from "$lib/components/ui/label";
</script>

<CheckboxGroup aria-label="Select frameworks" value={["next"]}>
    <Label>
        <Checkbox value="next" />
        Next.js
    </Label>
    <Label>
        <Checkbox value="vite" />
        Vite
    </Label>
    <Label>
        <Checkbox value="astro" />
        Astro
    </Label>
</CheckboxGroup>
