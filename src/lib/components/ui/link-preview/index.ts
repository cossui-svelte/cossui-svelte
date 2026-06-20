/* eslint-disable perfectionist/sort-named-exports */

import { LinkPreview as LinkPreviewPrimitive } from 'bits-ui';

const Root = LinkPreviewPrimitive.Root;
const Trigger = LinkPreviewPrimitive.Trigger;

export { default as LinkPreviewPrimitiveContent } from './link-preview-content.svelte';
export { Root as LinkPreviewPrimitiveCard, Trigger as LinkPreviewPrimitiveTrigger };
