CREATE TABLE `page` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`url` text NOT NULL,
	`author_name` text NOT NULL,
	`author_url` text NOT NULL,
	`published_at` integer NOT NULL,
	`cached_at` integer NOT NULL,
	`html_content` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `page_url_unique` ON `page` (`url`);