import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.games);
    await db.delete(schema.items);
    await db.delete(schema.itemImages);
    await db.delete(schema.users);
    await db.delete(schema.userItems);
    await db.delete(schema.userGames);

    await db.insert(schema.games).values([
      {
        id: 1,
        name: "Ocarina of Time",
        imageSrc: "/ocarina-time.png",
      },
      {
        id: 2,
        name: "Majora's Mask",
        imageSrc: "/deku-stick.png",
      },
    ]);

    await db.insert(schema.items).values([
      {
        id: 1,
        game_id: 1,
        name: "deku stick",
      },
      {
        id: 2,
        game_id: 1,
        name: "fairy ocarina",
        maxStateIndex: 2,
      },
      {
        id: 3,
        game_id: 2,
        name: "ocarina of time",
      },
    ]);

    await db.insert(schema.itemImages).values([
      {
        id: 1,
        itemId: 1,
        imageSrc: "/deku-stick.png",
      },
      {
        id: 2,
        itemId: 2,
        imageSrc: "/fairy-ocarina.png",
      },
      {
        id: 3,
        itemId: 3,
        imageSrc: "/ocarina-time.png",
      },
      {
        id: 4,
        itemId: 2,
        imageSrc: "/ocarina-time.png",
      },
    ]);

    await db.insert(schema.users).values([
      {
        id: "1",
        userName: "Link",
        userImageSrc: "/link.png",
        activeGameId: 1,
      },
      {
        id: "2",
        userName: "Zelda",
        userImageSrc: "/zelda.png",
        activeGameId: 2,
      },
    ]);

    await db.insert(schema.userGames).values([
      {
        id: 1,
        user_id: "1",
        game_id: 1,
      },
      {
        id: 2,
        user_id: "2",
        game_id: 2,
      },
    ]);

    await db.insert(schema.userItems).values([
      {
        id: 1,
        user_id: "1",
        item_id: 1,
        currentStateIndex: 0,
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
