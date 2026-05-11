// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { isVertical, isBottomOrRight, isInput, isBrowser } from "./is.js";

describe("isVertical", () => {
	it("returns true for 'top'", () => {
		expect(isVertical("top")).toBe(true);
	});

	it("returns true for 'bottom'", () => {
		expect(isVertical("bottom")).toBe(true);
	});

	it("returns false for 'left'", () => {
		expect(isVertical("left")).toBe(false);
	});

	it("returns false for 'right'", () => {
		expect(isVertical("right")).toBe(false);
	});
});

describe("isBottomOrRight", () => {
	it("returns true for 'bottom'", () => {
		expect(isBottomOrRight("bottom")).toBe(true);
	});

	it("returns true for 'right'", () => {
		expect(isBottomOrRight("right")).toBe(true);
	});

	it("returns false for 'top'", () => {
		expect(isBottomOrRight("top")).toBe(false);
	});

	it("returns false for 'left'", () => {
		expect(isBottomOrRight("left")).toBe(false);
	});
});

describe("isInput", () => {
	it("returns truthy for text input", () => {
		const input = document.createElement("input");
		input.type = "text";
		expect(isInput(input)).toBeTruthy();
	});

	it("returns truthy for input with no type (defaults to text)", () => {
		const input = document.createElement("input");
		expect(isInput(input)).toBeTruthy();
	});

	it("returns falsy for checkbox input", () => {
		const input = document.createElement("input");
		input.type = "checkbox";
		expect(isInput(input)).toBeFalsy();
	});

	it("returns falsy for radio input", () => {
		const input = document.createElement("input");
		input.type = "radio";
		expect(isInput(input)).toBeFalsy();
	});

	it("returns falsy for range input", () => {
		const input = document.createElement("input");
		input.type = "range";
		expect(isInput(input)).toBeFalsy();
	});

	it("returns falsy for file input", () => {
		const input = document.createElement("input");
		input.type = "file";
		expect(isInput(input)).toBeFalsy();
	});

	it("returns falsy for button input", () => {
		const input = document.createElement("input");
		input.type = "button";
		expect(isInput(input)).toBeFalsy();
	});

	it("returns truthy for textarea", () => {
		const textarea = document.createElement("textarea");
		expect(isInput(textarea)).toBeTruthy();
	});

	it("returns falsy for regular div", () => {
		const div = document.createElement("div");
		expect(isInput(div)).toBeFalsy();
	});

	it("returns falsy for button element", () => {
		const button = document.createElement("button");
		expect(isInput(button)).toBeFalsy();
	});
});

describe("isBrowser", () => {
	it("is true in test environment (jsdom)", () => {
		expect(isBrowser).toBe(true);
	});
});
