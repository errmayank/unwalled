import z from 'zod';

const schema = z.object({
	MODE: z.enum(['development', 'production', 'test']).default('development'),
	BASE_URL: z.string().url(),
	CLIENT_BASE_URL: z.string().url(),
	JUNO_API_URL: z.string().url(),
	DATABASE_URL: z.string().url(),
	DATABASE_AUTH_TOKEN: z.string(),
});

const env = schema.safeParse({
	MODE: process.env['NEXT_PUBLIC_MODE'],
	BASE_URL: process.env['NEXT_PUBLIC_SERVER_BASE_URL'],
	CLIENT_BASE_URL: process.env['NEXT_PUBLIC_CLIENT_BASE_URL'],
	JUNO_API_URL: process.env['JUNO_API_URL'],
	DATABASE_URL: process.env['DATABASE_URL'],
	DATABASE_AUTH_TOKEN: process.env['DATABASE_AUTH_TOKEN'],
});

if (!env.success) {
	console.error(env.error);
	throw new Error('Unable to load server environment variables');
}

export const Server = { env: env.data };
