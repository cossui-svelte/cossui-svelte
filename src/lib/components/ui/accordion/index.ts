import { Accordion as AccordionPrimitive } from 'bits-ui';
import Accordion from './accordion.svelte';
import AccordionItem from './accordion-item.svelte';
import AccordionPanel from './accordion-panel.svelte';
import AccordionTrigger from './accordion-trigger.svelte';

const AccordionHeader = AccordionPrimitive.Header;

export {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionPanel as AccordionContent,
  AccordionPrimitive,
  AccordionTrigger
};
