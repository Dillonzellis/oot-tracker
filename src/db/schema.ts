import { relations } from "drizzle-orm";
import { pgTable, serial, text, integer, pgEnum } from "drizzle-orm/pg-core";

export const Games = pgTable("Games", {
  game_id: serial("game_id").primaryKey(),
  name: text("name").notNull().default("New Game"),
  image_src: text("image_src").notNull().default("/deku-stick.png"),
});

export const Items = pgTable("Items", {
  item_id: serial("item_id").primaryKey(),
  name: text("name").notNull(),
  image_src: text("image_src").notNull().default("/deku-stick.png"),
  game_id: integer("game_id")
    .notNull()
    .references(() => Games.game_id, {
      onDelete: "cascade",
    }),
  item_state: integer("item_state").references(() => ItemStates.state_id, {
    onDelete: "cascade",
  }),
});

export const itemRelations = relations(Items, ({ one }) => ({
  game: one(Games, {
    fields: [Items.game_id],
    references: [Games.game_id],
  }),
  state: one(ItemStates, {
    fields: [Items.item_state],
    references: [ItemStates.state_id],
  }),
}));

export const itemStateEnum = pgEnum("state", [
  "NOT FOUND",
  "FOUND",
  "UPGRADED 1",
]);

export const ItemStates = pgTable("ItemStates", {
  state_id: serial("state_id").primaryKey(),
  state: itemStateEnum("state").notNull().default("NOT FOUND"),
});
