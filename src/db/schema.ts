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

export const UserItems = pgTable("UserItems", {
  user_id: text("user_id").primaryKey(),
  user_name: text("user_name").notNull().default("User"),
  user_image_src: text("user_image_src").notNull().default("/mascot.svg"),
  active_game_id: integer("active_game_id").references(() => Games.game_id, {
    onDelete: "cascade",
  }),
});

export const userItemRelations = relations(UserItems, ({ one }) => ({
  activeGame: one(Games, {
    fields: [UserItems.active_game_id],
    references: [Games.game_id],
  }),
}));

// export const userItemRelations = relations(UserItems, ({ one }) => ({
//   item: one(Items, {
//     fields: [UserItems.item_id],
//     references: [Items.item_id],
//   }),
//   user: one(Users, {
//     fields: [UserItems.user_id],
//     references: [Users.user_id],
//   }),
// }));
