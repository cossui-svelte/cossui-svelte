
* IMPROVEMENT - Drawer nested, do not stack properly on top of each others, the position is off
* global.css seems off from the original code base
* Form Controls need to be rethought - first then should apply to complex elements such as sliders and number fields, second the must handle defaultValue
* Issue with particule generation script, the meta.class is not copied over
* add the bundle version in the footer

* DONE Not a bug, Table - the outer table border should be darker
* DONE toast-12 13 have bugs
* DONE p-radio-group-6 bugs
* DONE Breadcrumb - ... is aligned, but it takes a hack
* DONE p-checkbox-group 3/4/5 create a recursive rendering issue
* DONE tooltips
* DONE GROUP bug with menu '...'
* DONE PROGRESS with a simple value - does not work
* DONE combobox multiple - when typing manually and there is a match, the matched content should disapear from the combo input
* DONE p-toogle-8 has an issue
* DONE OTPField needs a size attribute
* DONE p-combobox-9 - duplication of content on compobox
* DONE p-group-2 fails
* DONE p-group-14 css issue
* DONE p-group-22
* DONE p-timeline-8
* DONE Search all particle Lable - many of the form validations are failing, fix them
* DONE combobox with long popup won't scroll
* DONE Not a real bug - combobox-list.svelte is using a DIV rather than the scrollarea. fix it, it is commit f99d67ca16adad03890bb7126cf26f4041e676d4
* DONE p-group-23 is nor working, combobox+input filter
* DONE Drawer with style inset, shows a white bar (css issue)
* DONE Collapsible animation
* DONE MENU bug
* DONE - Drawer & Dialog-alert
* DONE - All popups, drawers and alerts are broken
* DONE - TOOLTIPS - no animations
* DONE - METER - this is not a bug.. but the ends should be round
* DONE - toplevel padding
* DONE ACCORDIONS - no animations, custom + still show an anchor

TODO:

* bring these INPUT particules  https://github.com/max-got/originui-svelte/pull/74/changes#diff-6fba7ce7af673abb0664807b5dd0eedd11491641888296d9a0ee99d431c779b7
* check for any origin particule with no coosui equivalent
* bring tree & tanstack tables
* bring file upload

to port from origin -

Phone number
/src/lib/components/inputs/input-47.svelte
Copy to clipboard
nents/inputs/input-54.svelte

Masks
inputs/input-55.svelte
timestamp
inputs/input-56.svelte
date&time input
inputs/input-40.svelte
Range
inputs/input-57.svelte

input with overlapping label 
inputs/input-31.svelte  32 33