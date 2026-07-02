// This file contains extra meta-data, to add into the registry
// it is edited manually

import { type RegistryUiData } from './generateComponentRegistry';

export const custom_components_metadata: RegistryUiData = {
	accordion: {
		description: "A set of collapsible panels with headings and content.",
		category: "ui",
	},
	alert: {
		description: "A callout for displaying important information.",
		category: "ui",
	},
	"alert-dialog": {
		description: "A dialog that requires user response to proceed.",
		category: "ui",

	},
	autocomplete: {
		description: "An input that suggests options as you type.",
		category: "ui",

	},
	"aspect-ratio": {
		description: "Displays content within a desired ratio.",
		category: "bits-ui",
	},
	avatar: {
		description: "An image element with a fallback for representing the user.",
		category: "ui",

	},
	badge: {
		description: "A badge or a component that looks like a badge.",
		category: "ui",
	},
	banner: {
		description: "A callout to show site-wide information.",
		category: "extra",
	},
	breadcrumb: {
		description: "Displays the path to the current resource using a hierarchy of links.",
		category: "ui",
	},
	button: {
		description: "A button or a component that looks like a button.",
		category: "ui",
	},
	calendar: {
		description: "A date picker component with range and multi-select support.",
		category: "ui",
		istodo: true
	},
	card: {
		description: "A content container for grouping related information.",
		category: "ui",
	},
	chart: {
		description: "A chart component for visualizing data in various formats.",
		category: "shadcn-ui",
		istodo: true
	},
	checkbox: {
		description: "A control allowing the user to toggle between checked and not checked.",
		category: "ui",
	},
	"checkbox-group": {
		description: "Provides shared state to a series of checkboxes.",
		category: "ui",
	},
	collapsible: {
		description: "A collapsible panel controlled by a button trigger.",
		category: "ui",
	},
	combobox: {
		description: "An input combined with a list of predefined items to select.",
		category: "ui",
	},
	command: {
		description: "A command palette component built with Dialog and Autocomplete for searching and executing commands.",
		category: "ui",
	},
	"context-menu": {
		description: "A menu that opens on right-click, providing contextual actions.",
		category: "ui",
		isnew: true,
	},
	cropper: {
		description: "A component for cropping images with a resizable and movable selection area.",
		category: "origin-ui",
		istodo: true
	},
	"date-picker": {
		description: "A date picker component built with Calendar and Popover.",
		category: "ui",
	},
	dialog: {
		description: "A popup that opens on top of the entire page.",
		category: "ui",
	},
	drawer: {
		description: "A panel that slides in from the edge of the screen with swipe gestures, snap points, and nested drawer support.",
		category: "ui",
		isnew: true,
	},
	empty: {
		description: "A container for displaying empty state information.",
		category: "ui",

	},
	field: {
		description: "A component that provides labelling and validation for form controls.",
		category: "ui",
	},
	fieldset: {
		description: "A native fieldset element with a legend.",
		category: "ui",
	},
	'file-upload': {
		description: "A component for uploading files with drag-and-drop support.",
		category: "origin-ui",
		istodo: true
	},
	form: {
		description: "A form wrapper component that simplifies validation and submission.",
		category: "ui",
	},
	frame: {
		description: "A framed container for grouping related information.",
		category: "ui",
	},
	group: {
		description: "A component for visually grouping a series of controls.",
		category: "ui",
	},
	"link-preview": {
		description: "A popup that appears when an element is hovered, showing preview information.",
		category: "bits-ui",
	},
	input: {
		description: "A native input element.",
		category: "ui",

	},
	"input-group": {
		description: "A flexible component for grouping inputs with addons, buttons, and other elements.",
		category: "ui",

	},
	kbd: {
		description: "A component for displaying keyboard keys and shortcuts.",
		category: "ui",

	},
	label: {
		description: "Renders an accessible label associated with controls.",
		category: "ui",

	},
	menu: {
		description: "A list of actions in a dropdown, enhanced with keyboard navigation.",
		category: "ui",
		isnew: true,
	},
	meter: {
		description: "A graphical display of a numeric value within a range.",
		category: "ui",

	},
	"number-field": {
		description: "A numeric input element with increment and decrement buttons, and a scrub area.",
		category: "ui",

	},
	"otp-field": {
		description: "A segmented input for one-time passwords and verification codes.",
		category: "ui",
		isnew: true,
	},
	pagination: {
		description: "A pagination with page navigation, next and previous links.",
		category: "ui",

	},
	popover: {
		description: "An accessible popup anchored to a button.",
		category: "ui",

	},
	"preview-card": {
		description: "A popup that appears when a link is hovered, showing a preview for sighted users.",
		category: "ui",
	},
	progress: {
		description: "Displays the status of a task that takes a long time.",
		category: "ui",
	},
	"radio-group": {
		description: "A set of checkable buttons where no more than one of the buttons can be checked at a time.",
		category: "ui",
	},
	"rich-editor": {
		description: "A rich text editor component with formatting options.",
		category: "extra",
		istodo: true
	},
	"scroll-area": {
		description: "A native scroll container with custom scrollbars.",
		category: "ui",

	},
	stepper: {
		description: "A component for displaying a series of steps in a process.",
		category: "origin-ui",
	},
	select: {
		description: "A common form component for choosing a predefined value in a dropdown menu.",
		category: "ui",

	},
	separator: {
		description: "A separator element accessible to screen readers.",
		category: "ui",

	},
	sheet: {
		description: "A flyout that opens from the side of the screen, based on the dialog component.",
		category: "ui",

	},
	skeleton: {
		description: "A loading state skeleton for your components.",
		category: "ui",
		istodo: true
	},
	slider: {
		description: "An input where the user selects a value from within a given range.",
		category: "ui",
	},
	spinner: {
		description: "An indicator that can be used to show a loading state.",
		category: "ui",
	},
	'split-pane': {
		description: "A component to layout resizable panels with a draggable divider.",
		category: "extra",
		istodo: true
	},
	switch: {
		description: "A control that indicates whether a setting is on or off.",
		category: "ui",
	},
	table: {
		description: "A simple table component for displaying tabular data.",
		category: "ui",
		istodo: true
	},
	tabs: {
		description: "A component for toggling between related panels on the same page.",
		category: "ui",
	},
	textarea: {
		description: "A native textarea element for multi-line text input.",
		category: "ui",

	},
	timeline: {
		description: "A component for displaying a series of events in chronological order.",
		category: "origin-ui",
	},
	toast: {
		description: "A temporary notification that appears on screen to inform users.",
		category: "ui",
	},
	toggle: {
		description: "A two-state button that can be toggled on or off.",
		category: "ui",
	},
	"toggle-group": {
		description: "Provides a shared state to a series of toggle buttons.",
		category: "ui",
	},
	toolbar: {
		description: "A container for grouping a set of buttons and controls.",
		category: "ui",
	},
	tooltip: {
		description: "A popup that appears when an element is hovered or focused, showing a hint for sighted users.",
		category: "ui",
	},
	tree: {
		description: "A component for displaying a hierarchical tree of items.",
		category: "origin-ui",
		istodo: true
	}
};


