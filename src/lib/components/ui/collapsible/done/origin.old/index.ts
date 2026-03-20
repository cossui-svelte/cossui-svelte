/* eslint-disable perfectionist/sort-named-exports */
import { Collapsible as CollapsiblePrimitive } from 'bits-ui';

const Root = CollapsiblePrimitive.Root;
const Trigger = CollapsiblePrimitive.Trigger;
const Content = CollapsiblePrimitive.Content;

export {
  Content,
  Content as CollapsibleContent,
  Root,
  //
  Root as Collapsible,
  Trigger,
  Trigger as CollapsibleTrigger
};
