import { relations } from "drizzle-orm";
import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

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
}));

// export const lessonsRelations = relations(lessons, ({ one, many }) => ({
//   unit: one(units, {
//     fields: [lessons.unitId],
//     references: [units.id],
//   }),
//   challenges: many(challenges),
// }));
//
export const itemStates = pgTable("item_states", {
  stateId: serial("stateid").primaryKey(),
  stateName: text("stateName").notNull().default("not found"),
});

export const userItems = pgTable("user_items", {
  userId: text("userId").primaryKey(),
  itemId: integer("itemId")
    .references(() => items.itemId)
    .notNull(),
  stateId: integer("stateId")
    .references(() => itemStates.stateId)
    .notNull(),
});

export const games = pgTable("games", {
  gameId: serial("gameId").primaryKey(),
  gameName: text("gameName").notNull().default("game"),
});
