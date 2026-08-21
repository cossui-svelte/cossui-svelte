const INITIAL_DELAY_MS = 400;
const REPEAT_INTERVAL_MS = 60;

export function createPressRepeat(action: () => void, isAtLimit: () => boolean) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let intervalId: ReturnType<typeof setInterval> | undefined;
  // A pointerdown that already fired the action must suppress the click event the
  // browser dispatches right after pointerup, otherwise mouse presses double-fire.
  let pointerHandled = false;

  function stop() {
    clearTimeout(timeoutId);
    clearInterval(intervalId);
    timeoutId = undefined;
    intervalId = undefined;
  }

  function fire() {
    if (isAtLimit()) {
      stop();
      return;
    }
    action();
  }

  function onpointerdown(e: PointerEvent) {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    stop();
    pointerHandled = true;
    fire();
    timeoutId = setTimeout(() => {
      intervalId = setInterval(fire, REPEAT_INTERVAL_MS);
    }, INITIAL_DELAY_MS);
  }

  function onclick() {
    if (pointerHandled) {
      pointerHandled = false;
      return;
    }
    // Keyboard activation (Enter/Space) dispatches a click with no preceding pointerdown.
    fire();
  }

  return {
    onpointerdown,
    onpointerup: stop,
    onpointerleave: stop,
    onpointercancel: stop,
    onclick
  };
}
