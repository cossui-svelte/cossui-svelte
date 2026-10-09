const DEFAULT_SCROLL_THRESHOLD = 48;

/** True while the user scrolls down; used to slide the mobile header/footer away. */
export function useScrollHide(threshold = DEFAULT_SCROLL_THRESHOLD): { readonly current: boolean } {
  let isHidden = $state(false);

  $effect(() => {
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      if (currentY <= 0) {
        isHidden = false;
        lastScrollY = currentY;
        return;
      }
      if (Math.abs(delta) < threshold) return;
      isHidden = delta > 0;
      lastScrollY = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  return {
    get current() {
      return isHidden;
    }
  };
}
