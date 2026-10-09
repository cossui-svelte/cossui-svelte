// Minimal hash router so the whole app can live inside one bloc (`/blocs/view/app-calcom#/event-types`).
// It replaces Next.js `usePathname` / `useRouter` / `<Link>` from the original app.

export const DEFAULT_PATH = '/event-types';

function readPath(): string {
  if (typeof window === 'undefined') return DEFAULT_PATH;
  const hash = window.location.hash.slice(1);
  const path = hash.split('?')[0];
  return path.startsWith('/') ? path : DEFAULT_PATH;
}

class Router {
  path = $state(readPath());

  /** Call once from the root component (inside an `$effect`) to start listening to hash changes. */
  listen(): () => void {
    const sync = () => {
      this.path = readPath();
      window.scrollTo(0, 0);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }

  navigate(to: string): void {
    window.location.hash = to;
  }

  /** Like `navigate`, without adding a history entry (used for redirects). */
  replace(to: string): void {
    window.location.replace(`#${to}`);
  }

  back(): void {
    window.history.back();
  }

  /** True when the current path equals `url` or is nested below it. */
  isWithin(url: string): boolean {
    return this.path === url || this.path.startsWith(`${url}/`);
  }
}

export const router = new Router();

/** Turns an app path (`/booking/upcoming`) into a value usable as an `href`. */
export function href(path: string): string {
  if (path === '#' || /^(https?:|mailto:)/.test(path)) return path;
  return `#${path}`;
}
