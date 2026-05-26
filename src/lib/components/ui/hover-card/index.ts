/* eslint-disable perfectionist/sort-named-exports */
import { LinkPreview as HoverCardPrimitive } from 'bits-ui';
import Content from './hover-card-content.svelte';

const Root = HoverCardPrimitive.Root;
const Trigger = HoverCardPrimitive.Trigger;

export { Content as HoverCardContent, Root as HoverCard, Trigger as HoverCardTrigger };
