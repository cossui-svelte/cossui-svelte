

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