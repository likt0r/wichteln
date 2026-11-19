ALTER TABLE `groups` ADD `round` integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `groups` ADD `previous_group_id` text;--> statement-breakpoint
ALTER TABLE `groups` ADD `series_id` text;--> statement-breakpoint
ALTER TABLE `members` ADD `person_id` text;