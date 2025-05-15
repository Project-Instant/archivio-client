import { pgTable, foreignKey, unique, bigserial, text, timestamp, integer, serial, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const entityType = pgEnum("entity_type", ['pin', 'collection'])


export const pins = pgTable("pins", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	ownerId: bigserial("owner_id", { mode: "bigint" }).notNull(),
	title: text().notNull(),
	description: text(),
	thumbnailUrl: text("thumbnail_url").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	category: text().notNull(),
	fullUrl: text("full_url").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.ownerId],
			foreignColumns: [users.id],
			name: "constraint_1"
		}).onUpdate("cascade").onDelete("set null"),
	unique("pins_thumbnail_url_key").on(table.thumbnailUrl),
	unique("pins_full_url_key").on(table.fullUrl),
]);

export const locations = pgTable("locations", {
	lat: integer().notNull(),
	lng: integer().notNull(),
	addressName: text("address_name").notNull(),
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "locations_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
});

export const credentials = pgTable("credentials", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "credentials_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	hash: text().notNull(),
	userId: bigserial("user_id", { mode: "bigint" }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "constraint_1"
		}).onUpdate("cascade").onDelete("cascade"),
	unique("credentials_user_id_unique").on(table.userId),
]);

export const pinsViews = pgTable("pins_views", {
	id: serial().primaryKey().notNull(),
	pinId: bigserial("pin_id", { mode: "bigint" }).notNull(),
	userId: bigserial("user_id", { mode: "bigint" }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.pinId],
			foreignColumns: [pins.id],
			name: "constraint_1"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "constraint_2"
		}).onUpdate("cascade").onDelete("set null"),
]);

export const usersSettings = pgTable("users_settings", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "users_settings_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	userId: bigserial("user_id", { mode: "bigint" }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "constraint_1"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const pinsMeta = pgTable("pins_meta", {
	pinId: bigserial("pin_id", { mode: "bigint" }).notNull(),
	size: integer().notNull(),
	height: integer().notNull(),
	width: integer().notNull(),
	locationId: integer("location_id"),
}, (table) => [
	foreignKey({
			columns: [table.pinId],
			foreignColumns: [pins.id],
			name: "constraint_1"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const users = pgTable("users", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	login: text().notNull(),
	name: text(),
	avatarUrl: text("avatar_url"),
	description: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("users_login_key").on(table.login),
]);

export const collections = pgTable("collections", {
	id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	title: text().notNull(),
	ownerId: bigserial("owner_id", { mode: "bigint" }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.ownerId],
			foreignColumns: [users.id],
			name: "constraint_1"
		}),
]);

export const likes = pgTable("likes", {
	entityId: bigserial("entity_id", { mode: "bigint" }).notNull(),
	type: entityType().notNull(),
}, (table) => [
	primaryKey({ columns: [table.entityId, table.type], name: "constraint_6"}),
	unique("likes_entity_id_key").on(table.entityId),
]);

export const collectionsPins = pgTable("collections_pins", {
	pinId: bigserial("pin_id", { mode: "bigint" }).notNull(),
	collectionId: bigserial("collection_id", { mode: "bigint" }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.pinId],
			foreignColumns: [pins.id],
			name: "constraint_1"
		}),
	foreignKey({
			columns: [table.collectionId],
			foreignColumns: [collections.id],
			name: "constraint_2"
		}),
	primaryKey({ columns: [table.pinId, table.collectionId], name: "constraint_5"}),
]);

export const follows = pgTable("follows", {
	followerId: bigserial("follower_id", { mode: "bigint" }).notNull(),
	followingId: bigserial("following_id", { mode: "bigint" }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.followerId],
			foreignColumns: [users.id],
			name: "constraint_1"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.followingId],
			foreignColumns: [users.id],
			name: "constraint_2"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.followerId, table.followingId], name: "constraint_3"}),
]);
