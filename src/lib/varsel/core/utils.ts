/**
 * Utility function to conditionally join class names.
 * A lightweight alternative to libraries like `clsx` or `classnames`,
 * tailored for this project's needs.
 *
 * @param values - A list of class names or conditional expressions.
 * @returns A single string of valid class names joined by spaces.
 */
export const cn = (...values: Array<string | false | undefined | null>) =>
	values.filter(Boolean).join(" ");