import { pgTable, serial, boolean, text, integer } from "drizzle-orm/pg-core";

export const userItems = pgTable("user_items", {
  userid: serial("user_id").primaryKey(),
  itemId: integer("item_id")
    .references(() => items.id, { onDelete: "cascade" })
    .notNull(),
  itemState: boolean("item_state").notNull().default(false),
});

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(),
});
