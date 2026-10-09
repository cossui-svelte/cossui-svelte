// Replaces the original app's DebugProvider / useLoadingState: toggles that force skeleton states.

class Debug {
  enableArtificialDelay = $state(false);
  isLoadingOverride = $state<boolean | null>(null);
}

export const debug = new Debug();

/** Reactive "should we show the loading skeleton" flag with the artificial delay applied. */
export function useLoadingState(delayMs: number): { readonly current: boolean } {
  let isLoading = $state(debug.enableArtificialDelay);

  $effect(() => {
    if (!debug.enableArtificialDelay) {
      isLoading = false;
      return;
    }
    isLoading = true;
    const timer = setTimeout(() => {
      isLoading = false;
    }, delayMs);
    return () => clearTimeout(timer);
  });

  return {
    get current() {
      return debug.isLoadingOverride ?? isLoading;
    }
  };
}
