<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import {
    Pagination,
    PaginationContent,
    PaginationItem,
  } from "$lib/components/ui/pagination";

  interface Props {
    currentPage?: number;
    totalPages?: number;
  }

  let { currentPage = 1, totalPages = 5 }: Props = $props();
</script>

<Pagination>
  <PaginationContent class="w-full justify-between gap-2">
    <PaginationItem>
      <Button
        disabled={currentPage === 1}
        href={currentPage === 1 ? undefined : `#/page/${currentPage - 1}`}
        variant="outline"
      >
        Previous
      </Button>
    </PaginationItem>
    <PaginationItem>
      <Button
        disabled={currentPage === totalPages}
        href={currentPage === totalPages ? undefined : `#/page/${currentPage + 1}`}
        variant="outline"
      >
        Next
      </Button>
    </PaginationItem>
  </PaginationContent>
</Pagination>
