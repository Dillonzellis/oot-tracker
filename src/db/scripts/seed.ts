import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.Games);
    await db.delete(schema.Items);
    await db.delete(schema.ItemStates);
    await db.delete(schema.UserItems);

    await db.insert(schema.Games).values([
      {
        game_id: 1,
        name: "Ocarina of Time",
        image_src: "/ocarina-time.png",
      },
      {
        game_id: 2,
        name: "Majora's Mask",
        image_src: "/deku-stick.png",
      },
    ]);

    await db.insert(schema.ItemStates).values([
      {
        state_id: 1,
        state: "NOT FOUND",
      },
      {
        state_id: 2,
        state: "FOUND",
      },
      {
        state_id: 3,
        state: "UPGRADED 1",
      },
    ]);

    await db.insert(schema.Items).values([
      {
        item_id: 1,
        game_id: 1,
        name: "deku-stick",
        image_src: "/deku-stick.png",
        item_state: 1,
      },
      {
        item_id: 2,
        game_id: 1,
        name: "fairy-ocarina",
        image_src: "/fairy-ocarina.png",
        item_state: 2,
      },
      {
        item_id: 3,
        game_id: 2,
        name: "ocarina-of-time",
        image_src: "/ocarina-time.png",
        item_state: 3,
      },
    ]);

    await db.insert(schema.UserItems).values([
      {
        user_id: "1",
        user_name: "Link",
        user_image_src: "/link.png",
        active_game_id: 1,
      },

      {
        user_id: "2",
        user_name: "Zelda",
        user_image_src: "/zelda.png",
        active_game_id: 2,
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
