import { relations } from "drizzle-orm";
import { pgTable, serial, text, integer, pgEnum } from "drizzle-orm/pg-core";

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().default("New Game"),
  imageSrc: text("image_src").notNull().default("/deku-stick.png"),
});

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  imageSrc: text("image_src").notNull().default("/deku-stick.png"),
  game_id: integer("game_id")
    .notNull()
    .references(() => games.id, {
      onDelete: "cascade",
    }),
});

export const itemRelations = relations(items, ({ one }) => ({
  game: one(games, {
    fields: [items.game_id],
    references: [games.id],
  }),
}));

export const itemStateEnum = pgEnum("state", [
  "NOT FOUND",
  "FOUND",
  "UPGRADED 1",
]);

export const itemStates = pgTable("item_states", {
  id: serial("id").primaryKey(),
  state: itemStateEnum("state").notNull().default("NOT FOUND"),
});

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  userName: text("user_name").notNull().default("User"),
  userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
  activeGameId: integer("active_game_id").references(() => games.id, {
    onDelete: "cascade",
  }),
});

export const userItems = pgTable("user_items", {
  id: serial("id").primaryKey(),
  user_id: text("user_id").references(() => user.id, {
    onDelete: "cascade",
  }),
  item_id: integer("item_id").references(() => items.id, {
    onDelete: "cascade",
  }),
  state_id: integer("state_id").references(() => itemStates.id, {
    onDelete: "cascade",
  }),
});

export const userItemRelations = relations(userItems, ({ one }) => ({
  user: one(user, {
    fields: [userItems.user_id],
    references: [user.id],
  }),
  item: one(items, {
    fields: [userItems.item_id],
    references: [items.id],
  }),
  state: one(itemStates, {
    fields: [userItems.state_id],
    references: [itemStates.id],
  }),
}));
