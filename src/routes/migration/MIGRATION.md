


import Link from 'next/link' ->

SvelteKit automatically intercepts <a> tag clicks and handles them as client-side navigation (no full page reload), so you get the same behavior as Next.js's <Link> out of the box.


////


import { Fragment } from "react"; -> Not needed in Svelte

In Svelte, you don't need Fragment at all. Svelte components already allow multiple root elements, so you can just write them directly:

<div>first</div>
<p>second</p>
If you need a wrapper that renders nothing in the DOM (the main use case for React's Fragment), Svelte has no direct equivalent — but you typically don't need one since multiple root elements are natively supported.

The only case where you might want a "grouping" construct is inside {#each} or {#if} blocks with multiple elements, and those blocks themselves act as the wrapper:

{#if condition}
  <div>first</div>
  <p>second</p>
{/if}

======


className -> class
htmlFor -> for
style={{ color: 'red' }} -> style="color: red"

style={{ color: variable }} -> style={ color: red }

Reserved JavaScript keywords (same reason as for → htmlFor):
* for → htmlFor
* class → className
camelCase conversions (React uses camelCase for all attributes):
* tabindex → tabIndex
* readonly → readOnly
* maxlength → maxLength
* minlength → minLength
* colspan → colSpan
* rowspan → rowSpan
* contenteditable → contentEditable
* crossorigin → crossOrigin
* accesskey → accessKey
* enctype → encType
* formaction → formAction
* novalidate → noValidate
* autofocus → autoFocus
* autoplay → autoPlay
* autocomplete → autoComplete
* spellcheck → spellCheck
* srcset → srcSet
* usemap → useMap
Event handlers follow the same camelCase pattern:
* onclick → onClick
* onchange → onChange
* onsubmit → onSubmit, etc.
Special cases:
* style takes a JavaScript object instead of a string — so style="color: red" becomes style={{ color: 'red' }}
* checked and value behave differently — in React they become controlled props tied to state
* SVG attributes like stroke-width → strokeWidth, fill-opacity → fillOpacity


<GroupText render={<Label aria-label="Domain" htmlFor="domain" />}>
        https://
</GroupText>
->
<GroupText>
    <Label aria-label="Domain" htmlFor="domain">https://</Label>
</GroupText>

no funky <> </> -> just ignore