import { relations } from "drizzle-orm/relations";
import { users, pins, credentials, pinsViews, usersSettings, pinsMeta, collections, collectionsPins, follows } from "./schema";

export const pinsRelations = relations(pins, ({one, many}) => ({
	user: one(users, {
		fields: [pins.ownerId],
		references: [users.id]
	}),
	pinsViews: many(pinsViews),
	pinsMetas: many(pinsMeta),
	collectionsPins: many(collectionsPins),
}));

export const usersRelations = relations(users, ({many}) => ({
	pins: many(pins),
	credentials: many(credentials),
	pinsViews: many(pinsViews),
	usersSettings: many(usersSettings),
	collections: many(collections),
	follows_followerId: many(follows, {
		relationName: "follows_followerId_users_id"
	}),
	follows_followingId: many(follows, {
		relationName: "follows_followingId_users_id"
	}),
}));

export const credentialsRelations = relations(credentials, ({one}) => ({
	user: one(users, {
		fields: [credentials.userId],
		references: [users.id]
	}),
}));

export const pinsViewsRelations = relations(pinsViews, ({one}) => ({
	pin: one(pins, {
		fields: [pinsViews.pinId],
		references: [pins.id]
	}),
	user: one(users, {
		fields: [pinsViews.userId],
		references: [users.id]
	}),
}));

export const usersSettingsRelations = relations(usersSettings, ({one}) => ({
	user: one(users, {
		fields: [usersSettings.userId],
		references: [users.id]
	}),
}));

export const pinsMetaRelations = relations(pinsMeta, ({one}) => ({
	pin: one(pins, {
		fields: [pinsMeta.pinId],
		references: [pins.id]
	}),
}));

export const collectionsRelations = relations(collections, ({one, many}) => ({
	user: one(users, {
		fields: [collections.ownerId],
		references: [users.id]
	}),
	collectionsPins: many(collectionsPins),
}));

export const collectionsPinsRelations = relations(collectionsPins, ({one}) => ({
	pin: one(pins, {
		fields: [collectionsPins.pinId],
		references: [pins.id]
	}),
	collection: one(collections, {
		fields: [collectionsPins.collectionId],
		references: [collections.id]
	}),
}));

export const followsRelations = relations(follows, ({one}) => ({
	user_followerId: one(users, {
		fields: [follows.followerId],
		references: [users.id],
		relationName: "follows_followerId_users_id"
	}),
	user_followingId: one(users, {
		fields: [follows.followingId],
		references: [users.id],
		relationName: "follows_followingId_users_id"
	}),
}));