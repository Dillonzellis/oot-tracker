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
    await db.delete(schema.itemStates);
    await db.delete(schema.userItems);

    await db.insert(schema.games).values([
      {
        gameId: 1,
        gameName: "ocarina-of-time",
      },
      {
        gameId: 2,
        gameName: "majoras-mask",
      },
    ]);

    await db.insert(schema.items).values([
      {
        itemId: 1,
        itemName: "deku-stick",
        imageSrc: "/deku-stick.png",
        gameId: 1,
      },
      {
        itemId: 2,
        itemName: "fairy-ocarina",
        imageSrc: "/fairy-ocarina.png",
        gameId: 1,
      },
      {
        itemId: 3,
        itemName: "ocarina-of-time",
        imageSrc: "/ocarina-time.png",
        gameId: 2,
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
