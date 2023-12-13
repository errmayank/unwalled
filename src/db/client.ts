import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import { Server } from '@/env/server';

const client = createClient({
	url: Server.env.DATABASE_URL,
	authToken: Server.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client);
