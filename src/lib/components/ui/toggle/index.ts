import type { Toggle as TogglePrimitive } from "bits-ui";
import Toggle from './toggle.svelte';
import type { ToggleSize, ToggleVariant } from "./toggle-variants";

export type ToggleProps = TogglePrimitive.RootProps & {
  variant?: ToggleVariant;
  size?: ToggleSize;
};

export { type ToggleVariants, toggleVariants, } from "./toggle-variants";
export {
  Toggle,
  type ToggleSize,
  type ToggleVariant,

}

