import { browser } from '$app/environment';

export function useIsMac(): {
  readonly current: boolean;
  readonly cmdOrCtrl: string;
  readonly optionOrAlt: string;
} {
  const isMac = $derived(browser ? navigator.userAgent.includes('Mac') : false);

  return {
    get cmdOrCtrl(): string {
      return isMac ? '⌘' : 'Ctrl';
    },
    get current(): boolean {
      return isMac;
    },
    get optionOrAlt(): string {
      return isMac ? '⌥' : 'Alt';
    }
  };
}
