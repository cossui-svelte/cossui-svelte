// This file contains extra meta-data, to add into the registry
// it is edited manually

export interface RegistryEntry {
	description: string;
	category: string;
	isnew: boolean;
	columns?: number;
}

export type RegistryData = Record<string, RegistryEntry>;

const registryCategory: RegistryData = {
	accordion: {
		description: "A set of collapsible panels with headings and content.",
		category: "ui",
		isnew: false,
		columns: 2,
	},
	alert: {
		description: "A callout for displaying important information.",
		category: "ui",
		isnew: false,
	},
	"alert-dialog": {
		description: "A dialog that requires user response to proceed.",
		category: "ui",
		isnew: false,
	},
	autocomplete: {
		description: "An input that suggests options as you type.",
		category: "ui",
		isnew: false,
	},
	avatar: {
		description: "An image element with a fallback for representing the user.",
		category: "ui",
		isnew: false,
	},
	badge: {
		description: "A badge or a component that looks like a badge.",
		category: "ui",
		isnew: false,
	},
	banner: {
		description: "A callout to show site-wide information.",
		category: "extra",
		isnew: false,
	},
	breadcrumb: {
		description: "Displays the path to the current resource using a hierarchy of links.",
		category: "ui",
		isnew: false,
	},
	button: {
		description: "A button or a component that looks like a button.",
		category: "ui",
		isnew: false,
	},
	calendar: {
		description: "A date picker component with range and multi-select support.",
		category: "ui",
		isnew: false,
	},
	card: {
		description: "A content container for grouping related information.",
		category: "ui",
		isnew: false,
	},
	checkbox: {
		description: "A control allowing the user to toggle between checked and not checked.",
		category: "ui",
		isnew: false,
	},
	"checkbox-group": {
		description: "Provides shared state to a series of checkboxes.",
		category: "ui",
		isnew: false,
	},
	collapsible: {
		description: "A collapsible panel controlled by a button trigger.",
		category: "ui",
		isnew: false,
	},
	combobox: {
		description: "An input combined with a list of predefined items to select.",
		category: "ui",
		isnew: false,
	},
	command: {
		description: "A command palette component built with Dialog and Autocomplete for searching and executing commands.",
		category: "ui",
		isnew: false,
	},
	"date-picker": {
		description: "A date picker component built with Calendar and Popover.",
		category: "ui",
		isnew: false,
	},
	dialog: {
		description: "A popup that opens on top of the entire page.",
		category: "ui",
		isnew: false,
	},
	drawer: {
		description: "A panel that slides in from the edge of the screen with swipe gestures, snap points, and nested drawer support.",
		category: "ui",
		isnew: true,
	},
	empty: {
		description: "A container for displaying empty state information.",
		category: "ui",
		isnew: false,
	},
	field: {
		description: "A component that provides labelling and validation for form controls.",
		category: "ui",
		isnew: false,
	},
	fieldset: {
		description: "A native fieldset element with a legend.",
		category: "ui",
		isnew: false,
	},
	form: {
		description: "A form wrapper component that simplifies validation and submission.",
		category: "ui",
		isnew: false,
	},
	frame: {
		description: "A framed container for grouping related information.",
		category: "ui",
		isnew: false,
	},
	group: {
		description: "A component for visually grouping a series of controls.",
		category: "ui",
		isnew: false,
	},
	input: {
		description: "A native input element.",
		category: "ui",
		isnew: false,
	},
	"input-group": {
		description: "A flexible component for grouping inputs with addons, buttons, and other elements.",
		category: "ui",
		isnew: false,
	},
	kbd: {
		description: "A component for displaying keyboard keys and shortcuts.",
		category: "ui",
		isnew: false,
	},
	label: {
		description: "Renders an accessible label associated with controls.",
		category: "ui",
		isnew: false,
	},
	menu: {
		description: "A list of actions in a dropdown, enhanced with keyboard navigation.",
		category: "ui",
		isnew: false,
	},
	meter: {
		description: "A graphical display of a numeric value within a range.",
		category: "ui",
		isnew: false,
	},
	"number-field": {
		description: "A numeric input element with increment and decrement buttons, and a scrub area.",
		category: "ui",
		isnew: false,
	},
	"otp-field": {
		description: "A segmented input for one-time passwords and verification codes.",
		category: "ui",
		isnew: true,
	},
	pagination: {
		description: "A pagination with page navigation, next and previous links.",
		category: "ui",
		isnew: false,
	},
	popover: {
		description: "An accessible popup anchored to a button.",
		category: "ui",
		isnew: false,
	},
	"preview-card": {
		description: "A popup that appears when a link is hovered, showing a preview for sighted users.",
		category: "ui",
		isnew: false,
	},
	progress: {
		description: "Displays the status of a task that takes a long time.",
		category: "ui",
		isnew: false,
	},
	"radio-group": {
		description: "A set of checkable buttons where no more than one of the buttons can be checked at a time.",
		category: "ui",
		isnew: false,
	},
	"scroll-area": {
		description: "A native scroll container with custom scrollbars.",
		category: "ui",
		isnew: false,
	},
	select: {
		description: "A common form component for choosing a predefined value in a dropdown menu.",
		category: "ui",
		isnew: false,
	},
	separator: {
		description: "A separator element accessible to screen readers.",
		category: "ui",
		isnew: false,
	},
	sheet: {
		description: "A flyout that opens from the side of the screen, based on the dialog component.",
		category: "ui",
		isnew: false,
	},
	skeleton: {
		description: "A loading state skeleton for your components.",
		category: "ui",
		isnew: false,
	},
	slider: {
		description: "An input where the user selects a value from within a given range.",
		category: "ui",
		isnew: false,
	},
	spinner: {
		description: "An indicator that can be used to show a loading state.",
		category: "ui",
		isnew: false,
	},
	switch: {
		description: "A control that indicates whether a setting is on or off.",
		category: "ui",
		isnew: false,
	},
	table: {
		description: "A simple table component for displaying tabular data.",
		category: "ui",
		isnew: false,
	},
	tabs: {
		description: "A component for toggling between related panels on the same page.",
		category: "ui",
		isnew: false,
	},
	textarea: {
		description: "A native textarea element.",
		category: "ui",
		isnew: false,
	},
	toast: {
		description: "A temporary notification that appears on screen to inform users.",
		category: "ui",
		isnew: false,
	},
	toggle: {
		description: "A two-state button that can be toggled on or off.",
		category: "ui",
		isnew: false,
	},
	"toggle-group": {
		description: "Provides a shared state to a series of toggle buttons.",
		category: "ui",
		isnew: false,
	},
	toolbar: {
		description: "A container for grouping a set of buttons and controls.",
		category: "ui",
		isnew: false,
	},
	tooltip: {
		description: "A popup that appears when an element is hovered or focused, showing a hint for sighted users.",
		category: "ui",
		isnew: false,
	},
};

export default registryCategory;
