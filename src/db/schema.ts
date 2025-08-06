import { pgTable, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at')
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow(),
});

export const posts = pgTable('posts', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  published: boolean('published').notNull().default(false),
  createdAt: timestamp('created_at')
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;