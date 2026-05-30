import { Accordion as AccordionPrimitive } from 'bits-ui';

export { default as Accordion } from './accordion.svelte';
export { default as AccordionItem } from './accordion-item.svelte';
export { default as AccordionPanel, default as AccordionContent } from './accordion-panel.svelte';
export { default as AccordionTrigger } from './accordion-trigger.svelte';
export { AccordionPrimitive };
export const AccordionHeader = AccordionPrimitive.Header;
