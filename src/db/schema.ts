import { relations } from "drizzle-orm";
import { pgTable, serial, text, integer, pgEnum } from "drizzle-orm/pg-core";

export const items = pgTable("items", {
  itemId: serial("itemId").primaryKey(),
  itemName: text("itemName").notNull().default("item"),
  imageSrc: text("imageSrc").notNull(),
  gameId: integer("gameId")
    .references(() => games.gameId, { onDelete: "cascade" })
    .notNull(),
});

export const itemsRelations = relations(items, ({ one }) => ({
  games: one(games, {
    fields: [items.gameId],
    references: [games.gameId],
  }),
  itemStates: one(itemStates, {
    fields: [items.itemId],
    references: [itemStates.itemId],
  }),
}));

export const itemStateEnum = pgEnum("state", [
  "NOT FOUND",
  "FOUND",
  "UPGRADED 1",
]);

export const itemStates = pgTable("item_states", {
  itemStateId: serial("itemStateId").primaryKey(),
  userId: text("userId").notNull(),
  gameId: integer("gameId"),
  itemId: integer("itemId")
    .references(() => items.itemId, { onDelete: "cascade" })
    .notNull(),
  state: itemStateEnum("state").notNull().default("NOT FOUND"),
});

export const itemStatesRelations = relations(itemStates, ({ one }) => ({
  user: one(userProgress, {
    fields: [itemStates.userId],
    references: [userProgress.userId],
  }),
  item: one(items, {
    fields: [itemStates.itemId],
    references: [items.itemId],
  }),
  game: one(games, {
    fields: [itemStates.gameId],
    references: [games.gameId],
  }),
}));

export const games = pgTable("games", {
  gameId: serial("gameId").primaryKey(),
  gameName: text("gameName").notNull().default("game"),
  imageSrc: text("imageSrc").notNull().default("/deku-stick.png"),
});

export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  userName: text("user_name").notNull().default("User"),
  userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
  activeGameId: integer("activeGameId").references(() => games.gameId, {
    onDelete: "cascade",
  }),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeGame: one(games, {
    fields: [userProgress.activeGameId],
    references: [games.gameId],
  }),
}));

// export const userItems = pgTable("user_items", {
//   userId: text("userId").primaryKey(),
//   userName: text("userName").notNull().default("User"),
//   userImageSrc: text("userImageSrc").notNull().default("/mascot.svg"),
//   itemId: integer("itemId")
//     .references(() => items.itemId)
//     .notNull(),
//   stateId: integer("stateId")
//     .references(() => itemStates.stateId, { onDelete: "cascade" })
//     .notNull(),
//   activeGameId: integer("activeGameId")
//     .references(() => games.gameId, { onDelete: "cascade" })
//     .notNull(),
// });
