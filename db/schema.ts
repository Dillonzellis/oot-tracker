import { pgTable, serial, boolean, text } from "drizzle-orm/pg-core";

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(),
  active: boolean("active").notNull().default(false),
});
