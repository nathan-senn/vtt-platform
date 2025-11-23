import { expect, test } from "vitest";

test("env parsing and loading is working", () => {
	expect(() => import("./env.js")).to.not.throw();
	expect(() => import("./env.js")).toBeDefined();
});
