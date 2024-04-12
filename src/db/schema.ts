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

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  userName: text("user_name").notNull().default("User"),
  userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
  activeGameId: integer("active_game_id").references(() => games.id, {
    onDelete: "cascade",
  }),
});

export const userGames = pgTable("user_games", {
  id: serial("id").primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  game_id: integer("game_id").references(() => games.id, {
    onDelete: "cascade",
  }),
});

export const userGameRelations = relations(userGames, ({ one }) => ({
  user: one(users, {
    fields: [userGames.user_id],
    references: [users.id],
  }),
  game: one(games, {
    fields: [userGames.game_id],
    references: [games.id],
  }),
}));

export const itemStateEnum = pgEnum("state", [
  "NOT_FOUND",
  "FOUND",
  "UPGRADED_1",
]);

export const itemStateType = typeof itemStateEnum;

export const userItems = pgTable("user_items", {
  id: serial("id").primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  item_id: integer("item_id")
    .notNull()
    .references(() => items.id, {
      onDelete: "cascade",
    }),
  state: itemStateEnum("state").notNull().default("NOT_FOUND"),
});

export const userItemRelations = relations(userItems, ({ one }) => ({
  user: one(users, {
    fields: [userItems.user_id],
    references: [users.id],
  }),
  item: one(items, {
    fields: [userItems.item_id],
    references: [items.id],
  }),
}));
