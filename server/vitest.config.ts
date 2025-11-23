import { defineConfig, mergeConfig } from "vitest/config";
import { loadEnv } from "vite";

const debugConfig = defineConfig({
	test: {
		// enables vscode's debugger to attach:
		// https://github.com/vitest-dev/vitest/issues/7540#issuecomment-2676869524
		fileParallelism: false,
		execArgv: ["--inspect"], // adjusted for newer vitest version
		// disables test timeout for easier debugging
		testTimeout: 0,
	},
});

const baseConfig = defineConfig({
	test: {
		env: loadEnv(
			// Always load these env files in this order, irrespective of the mode:
			// - ".env"
			// - ".env.local"
			// - ".env.test"
			// - ".env.test.local"
			// See: https://vite.dev/guide/env-and-mode.html#env-files
			"test",
			process.cwd(),
			// load all env variables including those without the "VITE_" prefix
			""
		),
	},
});

export default defineConfig(({ mode }) => {
	// vitest recommends to use the mode property for conditionally applying config:
	// https://vitest.dev/config/#configuring-vitest
	return mergeConfig(baseConfig, mode === "debug" ? debugConfig : {});
});
