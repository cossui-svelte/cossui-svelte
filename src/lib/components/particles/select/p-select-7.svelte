<script lang="ts">
  import { Select, SelectItem, SelectPopup, SelectTrigger } from "$lib/components/ui/select";

  const languages: Record<string, string> = {
    cpp: "C++",
    csharp: "C#",
    go: "Go",
    java: "Java",
    javascript: "JavaScript",
    php: "PHP",
    python: "Python",
    rust: "Rust",
    swift: "Swift",
    typescript: "TypeScript",
  };

  const values = Object.keys(languages);

  let selected = $state("javascript");
</script>

<Select aria-label="Select languages" value={selected} onValueChange={(v) => { selected = v; }}>
  <SelectTrigger>
    <span class="flex-1 truncate">{languages[selected] ?? "Select languages…"}</span>
  </SelectTrigger>
  <SelectPopup alignItemWithTrigger={false}>
    {#each values as value (value)}
      <SelectItem {value}>{languages[value]}</SelectItem>
    {/each}
  </SelectPopup>
</Select>
