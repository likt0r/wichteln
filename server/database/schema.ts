import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const groups = sqliteTable("groups", {
  id: text("id").primaryKey(), // Public ID used for grouping (not secret)
  adminToken: text("admin_token").notNull(), // Secret token for admin access
  name: text("name").notNull(),
  status: text("status").notNull().default("open"), // open, drawn
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  // "Next round" series: every round is its own group
  round: integer("round").notNull().default(1), // 1 for new groups, +1 per next round
  previousGroupId: text("previous_group_id"), // Group this round was created from
  seriesId: text("series_id"), // id of the first round's group (null = this group)
});

export const members = sqliteTable("members", {
  id: text("id").primaryKey(), // Secret ID used for member access
  groupId: text("group_id")
    .notNull()
    .references(() => groups.id),
  name: text("name").notNull(),
  targetMemberId: text("target_member_id"), // The person they have to gift
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  personId: text("person_id"), // Same person across rounds: id of the first round's member (null = this member)
});
