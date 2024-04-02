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

export const itemStateEnum = pgEnum("type", [
  "NOT FOUND",
  "FOUND",
  "UPGRADED 1",
]);

export const itemStates = pgTable("item_states", {
  itemStateId: serial("itemStateId").primaryKey(),
  userId: text("userId").notNull(),
  itemId: integer("itemId")
    .references(() => items.itemId, { onDelete: "cascade" })
    .notNull(),
  type: itemStateEnum("type").notNull().default("NOT FOUND"),
});

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

export const games = pgTable("games", {
  gameId: serial("gameId").primaryKey(),
  gameName: text("gameName").notNull().default("game"),
});
