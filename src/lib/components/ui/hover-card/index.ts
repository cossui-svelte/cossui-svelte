/* eslint-disable perfectionist/sort-named-exports */

import { LinkPreview as HoverCardPrimitive } from 'bits-ui';

const Root = HoverCardPrimitive.Root;
const Trigger = HoverCardPrimitive.Trigger;

export { default as HoverCardContent } from './hover-card-content.svelte';
export { Root as HoverCard, Trigger as HoverCardTrigger };
