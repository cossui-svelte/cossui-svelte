<script lang="ts">
  import {
    Autocomplete,
    AutocompleteCollection,
    AutocompleteInput,
    AutocompleteItem,
    AutocompleteList,
    AutocompletePopup,
    AutocompleteStatus
  } from '$lib/components/ui/autocomplete';
  import { Spinner } from '$lib/components/ui/spinner';

  type Movie = { id: string; title: string; year: number };

  const top100Movies: Movie[] = [
    { id: '1', title: 'The Shawshank Redemption', year: 1994 },
    { id: '2', title: 'The Godfather', year: 1972 },
    { id: '3', title: 'The Dark Knight', year: 2008 },
    { id: '4', title: 'The Godfather Part II', year: 1974 },
    { id: '5', title: '12 Angry Men', year: 1957 },
    { id: '8', title: 'Pulp Fiction', year: 1994 },
    { id: '11', title: 'Forrest Gump', year: 1994 },
    { id: '14', title: 'Inception', year: 2010 }
  ];

  async function searchMovies(query: string): Promise<Movie[]> {
    await new Promise((r) => setTimeout(r, Math.random() * 500 + 100));
    if (Math.random() < 0.01 || query === 'will_error') throw new Error('Network error');
    const q = query.toLowerCase();
    return top100Movies.filter(
      (m) => m.title.toLowerCase().includes(q) || m.year.toString().includes(q)
    );
  }

  let searchValue = $state('');
  let isLoading = $state(false);
  let searchResults = $state<Movie[]>([]);
  let error = $state<string | null>(null);

  $effect(() => {
    const query = searchValue;
    if (!query) {
      searchResults = [];
      isLoading = false;
      return;
    }

    isLoading = true;
    error = null;
    let cancelled = false;
    const id = setTimeout(async () => {
      try {
        const results = await searchMovies(query);
        if (!cancelled) searchResults = results;
      } catch {
        if (!cancelled) {
          error = 'Failed to fetch movies. Please try again.';
          searchResults = [];
        }
      } finally {
        if (!cancelled) isLoading = false;
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  });
</script>

<Autocomplete
  bind:value={searchValue}
  filter={null}
  items={searchResults}
  itemToStringValue={(movie: Movie) => movie.title}
>
  <AutocompleteInput placeholder="e.g. Pulp Fiction or 1994" />
  {#if searchValue}
    <AutocompletePopup aria-busy={isLoading || undefined}>
      <AutocompleteStatus class="text-muted-foreground">
        {#if isLoading}
          <span class="flex items-center justify-between gap-2 text-muted-foreground">
            Searching... <Spinner class="size-4.5 sm:size-4" />
          </span>
        {:else if error}
          <span class="font-normal text-destructive text-sm">{error}</span>
        {:else if searchResults.length === 0}
          <span class="font-normal text-muted-foreground text-sm">
            Movie or year "{searchValue}" does not exist in the Top 100 IMDb movies
          </span>
        {:else}
          {searchResults.length} result{searchResults.length === 1 ? '' : 's'} found
        {/if}
      </AutocompleteStatus>
      <AutocompleteList>
        <AutocompleteCollection>
          {#snippet children(movie: Movie)}
            <AutocompleteItem value={movie}>
              <div class="flex w-full flex-col gap-1">
                <div class="font-medium">{movie.title}</div>
                <div class="text-muted-foreground text-xs">{movie.year}</div>
              </div>
            </AutocompleteItem>
          {/snippet}
        </AutocompleteCollection>
      </AutocompleteList>
    </AutocompletePopup>
  {/if}
</Autocomplete>
