import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, jsonb, serial, index } from "drizzle-orm/pg-core";

// 分类表
export const categories = pgTable(
  "categories",
  {
    id: serial().primaryKey(),
    name: varchar("name", { length: 100 }).notNull().unique(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    description: text("description"),
    icon: varchar("icon", { length: 50 }),
    color: varchar("color", { length: 20 }).default("#6366f1"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("categories_slug_idx").on(table.slug),
  ]
);

// 用户资料表
export const profiles = pgTable(
  "profiles",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    username: varchar("username", { length: 50 }).notNull().unique(),
    display_name: varchar("display_name", { length: 100 }),
    avatar_url: text("avatar_url"),
    bio: text("bio"),
    is_verified: boolean("is_verified").default(false).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("profiles_username_idx").on(table.username),
  ]
);

// 帖子表
export const posts = pgTable(
  "posts",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    author_id: varchar("author_id", { length: 36 }).notNull().references(() => profiles.id),
    category_id: integer("category_id").notNull().references(() => categories.id),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    summary: varchar("summary", { length: 300 }),
    cover_image: text("cover_image"),
    view_count: integer("view_count").default(0).notNull(),
    like_count: integer("like_count").default(0).notNull(),
    comment_count: integer("comment_count").default(0).notNull(),
    is_pinned: boolean("is_pinned").default(false).notNull(),
    is_deleted: boolean("is_deleted").default(false).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("posts_author_id_idx").on(table.author_id),
    index("posts_category_id_idx").on(table.category_id),
    index("posts_created_at_idx").on(table.created_at),
    index("posts_like_count_idx").on(table.like_count),
  ]
);

// 评论表
export const comments = pgTable(
  "comments",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    post_id: varchar("post_id", { length: 36 }).notNull().references(() => posts.id, { onDelete: "cascade" }),
    author_id: varchar("author_id", { length: 36 }).notNull().references(() => profiles.id),
    parent_id: varchar("parent_id", { length: 36 }).references((): any => comments.id),
    content: text("content").notNull(),
    like_count: integer("like_count").default(0).notNull(),
    is_deleted: boolean("is_deleted").default(false).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("comments_post_id_idx").on(table.post_id),
    index("comments_author_id_idx").on(table.author_id),
    index("comments_parent_id_idx").on(table.parent_id),
    index("comments_created_at_idx").on(table.created_at),
  ]
);

// 点赞表
export const likes = pgTable(
  "likes",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    user_id: varchar("user_id", { length: 36 }).notNull().references(() => profiles.id),
    target_type: varchar("target_type", { length: 20 }).notNull(),
    target_id: varchar("target_id", { length: 36 }).notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("likes_user_id_idx").on(table.user_id),
    index("likes_target_idx").on(table.target_type, table.target_id),
    index("likes_unique_idx").on(table.user_id, table.target_type, table.target_id),
  ]
);

// 类型导出
export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = typeof profiles.$inferInsert;

export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type InsertComment = typeof comments.$inferInsert;

export type Like = typeof likes.$inferSelect;
export type InsertLike = typeof likes.$inferInsert;
