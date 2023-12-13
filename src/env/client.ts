import z from 'zod';

const schema = z.object({
	MODE: z.enum(['development', 'production', 'test']).default('development'),
	BASE_URL: z.string().url(),
	SERVER_BASE_URL: z.string().url(),
});

const env = schema.safeParse({
	MODE: process.env['NEXT_PUBLIC_MODE'],
	BASE_URL: process.env['NEXT_PUBLIC_CLIENT_BASE_URL'],
	SERVER_BASE_URL: process.env['NEXT_PUBLIC_SERVER_BASE_URL'],
});

if (!env.success) {
	console.error(env.error);
	throw new Error('Unable to load client environment variables');
}

export const Client = { env: env.data };
