import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const Page = sqliteTable('page', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	url: text('url').unique().notNull(),
	authorName: text('author_name').notNull(),
	authorUrl: text('author_url').notNull(),
	publishedAt: integer('published_at', { mode: 'number' }).notNull(),
	cachedAt: integer('cached_at', { mode: 'number' }).notNull(),
	htmlContent: text('html_content').notNull(),

	createdAt: integer('created_at', { mode: 'number' })
		.$defaultFn(() => Date.now())
		.notNull(),
	updatedAt: integer('updated_at', { mode: 'number' })
		.$defaultFn(() => Date.now())
		.notNull(),
	deletedAt: integer('deleted_at', { mode: 'number' }),
});
