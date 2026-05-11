import { Dialog } from "bits-ui";
export { default as Root } from "./root.svelte";
export { default as Content } from "./content.svelte";
export { default as Overlay } from "./overlay.svelte";
export { default as NestedRoot } from "./nested-root.svelte";
export { default as Close } from "./close.svelte";
export { default as Trigger } from "./trigger.svelte";

const Portal = Dialog.Portal;
const Title = Dialog.Title;
const Description = Dialog.Description;

export { Portal, Title, Description };

export * from "./types.js";
