<script lang="ts">
  import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
  } from "$lib/components/ui/pagination";
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue,
  } from "$lib/components/ui/select";

  interface Props {
    currentPage?: number;
    totalPages?: number;
    totalResults: number;
    resultsPerPage?: number;
  }

  let {
    currentPage: initialPage = 1,
    totalPages = 10,
    totalResults,
    resultsPerPage = 10,
  }: Props = $props();

  let currentPage = $state(initialPage);

  const resultRanges = $derived(
    Array.from({ length: totalPages }, (_, i) => {
      const start = i * resultsPerPage + 1;
      const end = Math.min((i + 1) * resultsPerPage, totalResults);
      return { label: `${start}-${end}`, value: String(i + 1) };
    }),
  );

  let selectedRange = $state(String(currentPage));

  $effect(() => {
    currentPage = Number(selectedRange);
  });
</script>

<div class="flex items-center justify-between gap-2">
  <div class="flex items-center gap-2 whitespace-nowrap">
    <p class="text-muted-foreground text-sm">Viewing</p>
    <Select bind:value={selectedRange} items={resultRanges}>
      <SelectTrigger aria-label="Select result range" class="w-fit min-w-none" size="sm">
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {#each resultRanges as { label, value } (value)}
          <SelectItem {value}>{label}</SelectItem>
        {/each}
      </SelectPopup>
    </Select>
    <p class="text-muted-foreground text-sm">
      of <strong class="font-medium text-foreground">{totalResults}</strong> results
    </p>
  </div>

  <Pagination>
    <PaginationContent class="w-full justify-between gap-2">
      <PaginationItem>
        <PaginationPrevious
          class="sm:*:[svg]:hidden"
          href="#"
          isDisabled={currentPage === 1}
          onclick={(e: MouseEvent) => {
            e.preventDefault();
            if (currentPage > 1) { currentPage--; selectedRange = String(currentPage); }
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext
          class="sm:*:[svg]:hidden"
          href="#"
          isDisabled={currentPage === totalPages}
          onclick={(e: MouseEvent) => {
            e.preventDefault();
            if (currentPage < totalPages) { currentPage++; selectedRange = String(currentPage); }
          }}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</div>
