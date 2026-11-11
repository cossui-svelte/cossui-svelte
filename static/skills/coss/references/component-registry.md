# coss Component Registry Index (cossui-svelte)

Use this file to quickly identify the right coss primitive for a UI task. Each entry includes the component name, a one-line purpose, and the path to its reference guide (relative to the skill root `static/skills/coss/`). Entries marked *(port-only)* exist in cossui-svelte but not in upstream React coss.

Every component installs with `npx shadcn-svelte@latest add https://cossui-svelte.com/r/<name>.json` and imports from `#lib/components/ui/<name>/index.js`.

For optional **`portalProps`** on composed `*Popup` components and **toast** providers (ShardsUI portal forwarding), see `./references/portal-props.md`.

## Overlays & Popups
- **Dialog** — Centered modal requiring user focus. `./references/primitives/dialog.md`
- **AlertDialog** — Destructive/critical confirmation modal. `./references/primitives/alert-dialog.md`
- **Drawer** — Bottom/side drawer, often mobile-responsive. `./references/primitives/drawer.md`
- **Sheet (legacy)** — Replaced by Drawer; do not use for new UI. Migration reference: `./references/primitives/sheet.md`
- **Popover** — Anchored non-modal floating content. `./references/primitives/popover.md`
- **Tooltip** — Short hover/focus hint text. `./references/primitives/tooltip.md`
- **PreviewCard** — Hover-triggered rich entity preview. `./references/primitives/preview-card.md`
- **LinkPreview** *(port-only)* — Preview Card specialized for links. `./references/primitives/link-preview.md`
- **Menu** — Dropdown action list with groups/submenus. `./references/primitives/menu.md`
- **ContextMenu** — Right-click/long-press action menu at the pointer. `./references/primitives/context-menu.md`
- **Command** — Searchable command palette (not cmdk). `./references/primitives/command.md`

## Selection & Input
- **Select** — Single/multi choice from a predefined list (no search). `./references/primitives/select.md`
- **Combobox** — Searchable selection with filtering and chips. `./references/primitives/combobox.md`
- **Autocomplete** — Free-text with suggestions. `./references/primitives/autocomplete.md`
- **PlacesAutocomplete** *(port-only)* — Address suggestions from Google Places. `./references/primitives/places-autocomplete.md`
- **Input** — Single-line text entry. `./references/primitives/input.md`
- **Textarea** — Multi-line text entry. `./references/primitives/textarea.md`
- **InputGroup** — Input with addons (icons, buttons, badges). `./references/primitives/input-group.md`
- **OTPField** — One-time passcode segmented slots. `./references/primitives/otp-field.md`
- **NumberField** — Numeric entry with stepper controls. `./references/primitives/number-field.md`
- **Slider** — Continuous/ranged numeric control. `./references/primitives/slider.md`
- **Calendar** — Inline date, multi-date and range calendars. `./references/primitives/calendar.md`
- **Date Picker** *(composite)* — Calendar in a Popover. `./references/primitives/date-picker.md`
- **ColorPicker** *(port-only)* — Popover color picker with sliders, inputs, swatches. `./references/primitives/colorpicker.md`
- **StarRating** *(port-only)* — Star/heart rating input or display. `./references/primitives/starrating.md`
- **File Upload** *(hook + particles)* — `useFileUpload` drag-and-drop uploads with previews. `./references/primitives/file-upload.md`
- **Cropper** *(port-only)* — Image cropping with zoom. `./references/primitives/cropper.md`
- **Composer** *(port-only)* — Chat/AI message input with mentions and slash actions. `./references/primitives/composer.md`

## Forms & Validation
- **Form** — Form submission and schema validation (`errors`, `onFormSubmit`). `./references/primitives/form.md`
- **Field** — Label + description + error wiring. `./references/primitives/field.md`
- **Fieldset** — Grouped form controls with legend. `./references/primitives/fieldset.md`
- **Label** — Accessible label for controls. `./references/primitives/label.md`

## Toggle & Choice
- **Checkbox** — Single boolean toggle. `./references/primitives/checkbox.md`
- **CheckboxGroup** — Multiple-selection set. `./references/primitives/checkbox-group.md`
- **RadioGroup** — Mutually exclusive single choice. `./references/primitives/radio-group.md`
- **SegmentedControl** — Segmented presentation rendered over radio choices, navigation links, or exclusive toggles; choose semantics first. `./references/primitives/segmented-control.md`
- **Switch** — Binary on/off preference toggle. `./references/primitives/switch.md`
- **Toggle** — Pressable two-state command button. `./references/primitives/toggle.md`
- **ToggleGroup** — Grouped pressed-state controls. `./references/primitives/toggle-group.md`

## Layout & Navigation
- **Tabs** — Mutually exclusive tabbed panels. `./references/primitives/tabs.md`
- **Accordion** — Collapsible content sections. `./references/primitives/accordion.md`
- **Collapsible** — Single expand/collapse region. `./references/primitives/collapsible.md`
- **Sidebar** — Persistent app shell navigation. `./references/primitives/sidebar.md`
- **Breadcrumb** — Hierarchical navigation trail. `./references/primitives/breadcrumb.md`
- **Pagination** — Paged navigation controls. `./references/primitives/pagination.md`
- **Stepper** *(port-only)* — Multi-step flow progress and navigation. `./references/primitives/stepper.md`
- **Toolbar** — Grouped command/action strip. `./references/primitives/toolbar.md`
- **ScrollArea** — Styled scroll container. `./references/primitives/scroll-area.md`
- **AspectRatio** *(port-only)* — Fixed-ratio media box. `./references/primitives/aspect-ratio.md`
- **Tree** *(port-only)* — Hierarchical tree with selection, DnD, search. `./references/primitives/tree.md`

## Content & Display
- **Card** — Content container with sections (and `CardFrame`). `./references/primitives/card.md`
- **Frame** — Bordered content surface. `./references/primitives/frame.md`
- **Table** — Tabular data presentation. `./references/primitives/table.md`
- **Avatar** — User/entity profile image. `./references/primitives/avatar.md`
- **Badge** — Status indicator / label. `./references/primitives/badge.md`
- **Kbd** — Keyboard shortcut hints. `./references/primitives/kbd.md`
- **Separator** — Visual/semantic divider. `./references/primitives/separator.md`
- **Group** — Connected control cluster. `./references/primitives/group.md`
- **Empty** — Empty-state placeholder. `./references/primitives/empty.md`
- **Timeline** *(port-only)* — Chronological event list. `./references/primitives/timeline.md`
- **Chart** *(port-only)* — LayerChart charts themed with coss tokens. `./references/primitives/chart.md`
- **Map** *(port-only)* — MapLibre maps with markers, routes, overlays. `./references/primitives/map.md`
- **Chat UI** *(port-only)* — Conversation building blocks (messages, reactions, replies, scroll). `./references/primitives/chat.md`

## Feedback & Status
- **Alert** — Inline persistent status message. `./references/primitives/alert.md`
- **Toast** — Transient notification (toastManager). `./references/primitives/toast.md`
- **Progress** — Task completion / async progress bar. `./references/primitives/progress.md`
- **Meter** — Bounded scalar measurement. `./references/primitives/meter.md`
- **Spinner** — Indeterminate loading indicator. `./references/primitives/spinner.md`
- **Skeleton** — Loading shimmer over real content (phantom-ui). `./references/primitives/skeleton.md`

## Actions
- **Button** — Primary/secondary action trigger (`buttonVariants` for other elements). `./references/primitives/button.md`

## Hooks (installable registry items)
- `use-is-mobile` (`IsMobile` MediaQuery), `use-is-mac`, `use-file-upload`, `use-character-limit`, `use-currency-input`, `use-uid` — `https://cossui-svelte.com/r/<hook>.json`, imported from `#lib/hooks/<hook>.svelte.js` (or `.js`).

## Not implemented

- **Rich Editor**, **Split Pane** — listed in the registry as TODO placeholders; there is no component yet. Don't import them.
