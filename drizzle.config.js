/** @type { import("drizzle-kit").Config } */
const config = {
	driver: 'turso',
	dbCredentials: {
		url: process.env['DATABASE_URL'],
		authToken: process.env['DATABASE_AUTH_TOKEN'],
	},
	out: './migrations',
	schema: './src/db/schema.ts',
	breakpoints: true,
	verbose: true,
	strict: true,
};

export default config;
