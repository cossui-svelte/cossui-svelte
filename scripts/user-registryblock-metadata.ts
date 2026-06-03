// This file contains extra meta-data, to add into the registry
// it is edited manually

export interface RegistryBlocksEntry {
	description: string;
	tags: string[]; // optional tags for categorization

	// those are generated, including the id
	//   name: string;
	//   file: string; // relative to src/lib/components/
	//   npmDependencies: string[];
	//   registryDependencies: string[];
}

export type RegistryBlocksData = Record<string, RegistryBlocksEntry>;

const registryBlocks: RegistryBlocksData = {
	accordion: {
		description: "A set of collapsible panels with headings and content.",
		tags: [],
	},
	alert: {
		description: "A callout for displaying important information.",
		tags: [],
	},
	"alert-dialog": {
		description: "A dialog that requires user response to proceed.",
		tags: [],
	},
	autocomplete: {
		description: "An input that suggests options as you type.",
		tags: [],
	},
	avatar: {
		description: "An image element with a fallback for representing the user.",
		tags: [],
	},
	badge: {
		description: "A badge or a component that looks like a badge.",
		tags: [],
	},
	banner: {
		description: "A callout to show site-wide information.",
		tags: [],
	},
	breadcrumb: {
		description: "Displays the path to the current resource using a hierarchy of links.",
		tags: [],
	},
	button: {
		description: "A button or a component that looks like a button.",
		tags: [],
	},
	calendar: {
		description: "A date picker component with range and multi-select support.",
		tags: [],
	},
	card: {
		description: "A content container for grouping related information.",
		tags: [],
	},
	checkbox: {
		description: "A control allowing the user to toggle between checked and not checked.",
		tags: [],
	},
	"checkbox-group": {
		description: "Provides shared state to a series of checkboxes.",
		tags: [],
	},
	collapsible: {
		description: "A collapsible panel controlled by a button trigger.",
		tags: [],
	},
	combobox: {
		description: "An input combined with a list of predefined items to select.",
		tags: [],
	},
	command: {
		description: "A command palette component built with Dialog and Autocomplete for searching and executing commands.",
		tags: [],
	},
	"date-picker": {
		description: "A date picker component built with Calendar and Popover.",
		tags: [],
	},
	dialog: {
		description: "A popup that opens on top of the entire page.",
		tags: [],
	},
	drawer: {
		description: "A panel that slides in from the edge of the screen with swipe gestures, snap points, and nested drawer support.",
		tags: [],
	},
	empty: {
		description: "A container for displaying empty state information.",
		tags: [],
	},
	field: {
		description: "A component that provides labelling and validation for form controls.",
		tags: [],
	},
	fieldset: {
		description: "A native fieldset element with a legend.",
		tags: [],
	},
	form: {
		description: "A form wrapper component that simplifies validation and submission.",
		tags: [],
	},
	frame: {
		description: "A framed container for grouping related information.",
		tags: [],
	},
	group: {
		description: "A component for visually grouping a series of controls.",
		tags: [],
	},
	input: {
		description: "A native input element.",
		tags: [],
	},
	"input-group": {
		description: "A flexible component for grouping inputs with addons, buttons, and other elements.",
		tags: [],
	},
	kbd: {
		description: "A component for displaying keyboard keys and shortcuts.",
		tags: [],
	},
	label: {
		description: "Renders an accessible label associated with controls.",
		tags: [],
	},
	menu: {
		description: "A list of actions in a dropdown, enhanced with keyboard navigation.",
		tags: [],
	},
	meter: {
		description: "A graphical display of a numeric value within a range.",
		tags: [],
	},
	"number-field": {
		description: "A numeric input element with increment and decrement buttons, and a scrub area.",
		tags: [],
	},
	"otp-field": {
		description: "A segmented input for one-time passwords and verification codes.",
		tags: [],
	},
	pagination: {
		description: "A pagination with page navigation, next and previous links.",
		tags: [],
	},
	popover: {
		description: "An accessible popup anchored to a button.",
		tags: [],
	},
	"preview-card": {
		description: "A popup that appears when a link is hovered, showing a preview for sighted users.",
		tags: [],
	},
	progress: {
		description: "Displays the status of a task that takes a long time.",
		tags: [],
	},
	"radio-group": {
		description: "A set of checkable buttons where no more than one of the buttons can be checked at a time.",
		tags: [],
	},
	"scroll-area": {
		description: "A native scroll container with custom scrollbars.",
		tags: [],
	},
	select: {
		description: "A common form component for choosing a predefined value in a dropdown menu.",
		tags: [],
	},
	separator: {
		description: "A separator element accessible to screen readers.",
		tags: [],
	},
	sheet: {
		description: "A flyout that opens from the side of the screen, based on the dialog component.",
		tags: [],
	},
	skeleton: {
		description: "A loading state skeleton for your components.",
		tags: [],
	},
	slider: {
		description: "An input where the user selects a value from within a given range.",
		tags: [],
	},
	spinner: {
		description: "An indicator that can be used to show a loading state.",
		tags: [],
	},
	switch: {
		description: "A control that indicates whether a setting is on or off.",
		tags: [],
	},
	table: {
		description: "A simple table component for displaying tabular data.",
		tags: [],
	},
	tabs: {
		description: "A component for toggling between related panels on the same page.",
		tags: [],
	},
	textarea: {
		description: "A native textarea element.",
		tags: [],
	},
	toast: {
		description: "A temporary notification that appears on screen to inform users.",
		tags: [],
	},
	toggle: {
		description: "A two-state button that can be toggled on or off.",
		tags: [],
	},
	"toggle-group": {
		description: "Provides a shared state to a series of toggle buttons.",
		tags: [],
	},
	toolbar: {
		description: "A container for grouping a set of buttons and controls.",
		tags: [],
	},
	tooltip: {
		description: "A popup that appears when an element is hovered or focused, showing a hint for sighted users.",
		tags: [],
	},
};

export default registryBlocks;
