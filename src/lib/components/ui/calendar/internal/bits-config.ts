import { Context } from 'runed';
import { boxWith, type ReadableBox } from 'svelte-toolbelt';

type ConfigOpts = {
  defaultLocale?: ReadableBox<string | undefined>;
};

/**
 * Configuration state that inherits from parent configurations. Only the
 * `defaultLocale` option is vendored here, as it's the only one used by
 * the Calendar/RangeCalendar components.
 */
class BitsConfigState {
  opts: { defaultLocale: ReadableBox<string | undefined> };

  constructor(parent: BitsConfigState | null, opts: ConfigOpts) {
    this.opts = {
      defaultLocale: boxWith<string | undefined>(() => {
        const value = opts.defaultLocale?.current;
        if (value !== undefined) return value;
        if (parent === null) return undefined;
        return parent.opts.defaultLocale.current;
      })
    };
  }
}

const BitsConfigContext = new Context<BitsConfigState>('BitsConfig');

/**
 * Gets the current Bits configuration state from the context.
 * Returns a default configuration if no configuration is found.
 */
export function getBitsConfig() {
  const fallback = new BitsConfigState(null, {});
  return BitsConfigContext.getOr(fallback).opts;
}
