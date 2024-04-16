import { relations } from "drizzle-orm";
import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().default("New Game"),
  imageSrc: text("image_src").notNull().default("/deku-stick.png"),
});

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  game_id: integer("game_id")
    .notNull()
    .references(() => games.id, {
      onDelete: "cascade",
    }),
  maxStateIndex: integer("max_state_index").notNull().default(1),
});

export const itemImages = pgTable("item_images", {
  id: serial("id").primaryKey(),
  itemId: integer("item_id")
    .notNull()
    .references(() => items.id, {
      onDelete: "cascade",
    }),
  imageSrc: text("image_src").notNull().default("/deku-stick.png"),
});

export const itemImagesRelations = relations(itemImages, ({ one }) => ({
  item: one(items, {
    fields: [itemImages.itemId],
    references: [items.id],
  }),
}));

export const itemRelations = relations(items, ({ one, many }) => ({
  game: one(games, {
    fields: [items.game_id],
    references: [games.id],
  }),
  images: many(itemImages),
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
  currentStateIndex: integer("current_state_index").notNull().default(0),
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
