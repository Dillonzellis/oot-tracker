import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const items = pgTable("items", {
  itemId: serial("itemId").primaryKey(),
  itemName: text("itemName").notNull().default("item"),
  imageSrc: text("imageSrc").notNull(),
});

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
