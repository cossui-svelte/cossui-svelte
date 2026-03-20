/* eslint-disable perfectionist/sort-named-exports */
import { LinkPreview as HoverCardPrimitive } from 'bits-ui';
import Content from './hover-card-content.svelte';

const Root = HoverCardPrimitive.Root;
const Trigger = HoverCardPrimitive.Trigger;

export {
  Content,
  Content as HoverCardContent,
  Root,
  Root as HoverCard,
  Trigger,
  Trigger as HoverCardTrigger
};
