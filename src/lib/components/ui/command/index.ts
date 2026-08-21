/* eslint-disable perfectionist/sort-named-exports */

import { Autocomplete as AutocompletePrimitive } from '@shardsui/svelte/autocomplete';
import { Dialog as CommandDialogPrimitive } from '@shardsui/svelte/dialog';

export { default as Command } from './command.svelte';
export { default as CommandDialog } from './command-dialog.svelte';
export { default as CommandDialogBackdrop } from './command-dialog-backdrop.svelte';
export { default as CommandDialogPopup } from './command-dialog-popup.svelte';
export { default as CommandDialogTrigger } from './command-dialog-trigger.svelte';
export { default as CommandDialogViewport } from './command-dialog-viewport.svelte';
export { default as CommandEmpty } from './command-empty.svelte';
export { default as CommandFooter } from './command-footer.svelte';
export { default as CommandGroup } from './command-group.svelte';
export { default as CommandGroupLabel } from './command-group-label.svelte';
export { default as CommandInput } from './command-input.svelte';
export { default as CommandItem } from './command-item.svelte';
export { default as CommandList } from './command-list.svelte';
export { default as CommandPanel } from './command-panel.svelte';
export { default as CommandSeparator } from './command-separator.svelte';
export { default as CommandShortcut } from './command-shortcut.svelte';

const { Collection: CommandCollection } = AutocompletePrimitive;

export { CommandCollection };

export const CommandDialogPortal = CommandDialogPrimitive.Portal;
export const CommandCreateHandle = () => new CommandDialogPrimitive.Handle();

export { CommandDialogPrimitive };
