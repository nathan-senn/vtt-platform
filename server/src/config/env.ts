import { z } from "zod/v4";

const envSchema = z.object({
	TEST_ENV: z.string(),
});

let unsafeEnvs;
console.log("Loading and validating environment variables...");

try {
	unsafeEnvs = envSchema.parse(process.env, { reportInput: true });
	console.log("Environment variables loaded and validated successfully.", unsafeEnvs);
} catch (error) {
	if (error instanceof z.ZodError) {
		console.error(error.issues);
	}
	throw new Error("Invalid environment variables");
}

export const envs = unsafeEnvs;
