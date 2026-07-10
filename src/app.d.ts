// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { RequestClient } from '$data/api/helpers/RequestClient';

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      serverClient: RequestClient;
    }
    interface PageData {
      SEO?: {
        description: string;
        title: string;
      };
    }
    interface Platform {
      cf: CfProperties;
      ctx: ExecutionContext;
      env: Env;
    }
    // interface PageState {}
    // interface Platform {}
  }

  const __APP_VERSION__: string;
}
