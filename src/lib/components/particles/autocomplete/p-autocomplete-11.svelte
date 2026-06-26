<script lang="ts">
  import {
    Autocomplete,
    AutocompleteEmpty,
    AutocompleteInput,
    AutocompleteItem,
    AutocompleteList,
    AutocompletePopup,
    AutocompleteStatus,
  } from '$lib/components/ui/autocomplete';

  const limit = 7;

  const allItems = [
    { label: 'JavaScript', value: 'lang-js' },
    { label: 'TypeScript', value: 'lang-ts' },
    { label: 'Python', value: 'lang-py' },
    { label: 'Java', value: 'lang-java' },
    { label: 'C#', value: 'lang-csharp' },
    { label: 'C++', value: 'lang-cpp' },
    { label: 'C', value: 'lang-c' },
    { label: 'Go', value: 'lang-go' },
    { label: 'Rust', value: 'lang-rust' },
    { label: 'Ruby', value: 'lang-rb' },
    { label: 'PHP', value: 'lang-php' },
    { label: 'Swift', value: 'lang-swift' },
    { label: 'Kotlin', value: 'lang-kotlin' },
    { label: 'Scala', value: 'lang-scala' },
    { label: 'Elixir', value: 'lang-elixir' },
    { label: 'Haskell', value: 'lang-hs' },
    { label: 'Dart', value: 'lang-dart' },
    { label: 'Objective-C', value: 'lang-objc' },
    { label: 'Julia', value: 'lang-julia' },
    { label: 'R', value: 'lang-r' },
    { label: 'Perl', value: 'lang-perl' },
    { label: 'Lua', value: 'lang-lua' },
    { label: 'OCaml', value: 'lang-ocaml' },
    { label: 'F#', value: 'lang-fsharp' },
  ];

  let filterText = $state('');

  const matched = $derived(
    filterText.trim()
      ? allItems.filter((t) => t.label.toLowerCase().includes(filterText.trim().toLowerCase()))
      : allItems
  );

  const visibleItems = $derived(matched.slice(0, limit));
  const moreCount = $derived(Math.max(0, matched.length - limit));
</script>

<Autocomplete
  items={visibleItems}
  onInputValueChange={(v) => (filterText = v)}
>
  <AutocompleteInput placeholder="e.g. feature" />
  <AutocompletePopup>
    <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
    <AutocompleteList>
      {#each visibleItems as item (item.value)}
        <AutocompleteItem label={item.label} value={item.value}>{item.label}</AutocompleteItem>
      {/each}
    </AutocompleteList>
    {#if moreCount > 0}
      <AutocompleteStatus>+{moreCount} more (keep typing to narrow down)</AutocompleteStatus>
    {/if}
  </AutocompletePopup>
</Autocomplete>
