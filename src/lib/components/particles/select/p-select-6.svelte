<script lang="ts">
  import { Select, SelectGroup, SelectGroupLabel, SelectItem, SelectPopup, SelectSeparator, SelectTrigger, SelectValue } from "$lib/components/ui/select";

  const frontend = [
    { label: "Next.js", value: "next" },
    { label: "Vite", value: "vite" },
    { label: "Astro", value: "astro" },
  ];

  const backend = [
    { label: "Express", value: "express" },
    { label: "NestJS", value: "nestjs" },
    { label: "Fastify", value: "fastify" },
    { label: "Django", value: "django" },
    { label: "Flask", value: "flask" },
    { label: "Rails", value: "rails" },
  ];
</script>

<Select aria-label="Select framework">
  <SelectTrigger>
    <SelectValue placeholder="Select framework" />
  </SelectTrigger>
  <SelectPopup>
    <SelectGroup>
      <SelectGroupLabel>Frontend</SelectGroupLabel>
      {#each frontend as { label, value } (value)}
        <SelectItem {value}>{label}</SelectItem>
      {/each}
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectGroupLabel>Backend</SelectGroupLabel>
      {#each backend as { label, value } (value)}
        <SelectItem {value}>{label}</SelectItem>
      {/each}
    </SelectGroup>
  </SelectPopup>
</Select>
