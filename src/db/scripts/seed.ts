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
    await db.delete(schema.userProgress);

    await db.insert(schema.games).values([
      {
        gameId: 1,
        gameName: "Ocarina of Time",
        imageSrc: "/ocarina-time.png",
      },
      {
        gameId: 2,
        gameName: "Majora's Mask",
        imageSrc: "/deku-stick.png",
      },
    ]);

    await db.insert(schema.items).values([
      {
        itemId: 1,
        gameId: 1,
        itemName: "deku-stick",
        imageSrc: "/deku-stick.png",
      },
      {
        itemId: 2,
        gameId: 1,
        itemName: "fairy-ocarina",
        imageSrc: "/fairy-ocarina.png",
      },
      {
        itemId: 3,
        gameId: 2,
        itemName: "ocarina-of-time",
        imageSrc: "/ocarina-time.png",
      },
    ]);

    await db.insert(schema.itemStates).values([
      {
        itemStateId: 1,
        userId: "1",
        itemId: 1,
        gameId: 1,
        state: "FOUND",
      },
      {
        itemStateId: 2,
        userId: "2",
        itemId: 3,
        gameId: 2,
        state: "UPGRADED 1",
      },
    ]);

    await db.insert(schema.userProgress).values([
      {
        userId: "1",
        userName: "Link",
        userImageSrc: "/link.png",
        activeGameId: 1,
      },
      {
        userId: "2",
        userName: "Zelda",
        userImageSrc: "/zelda.png",
        activeGameId: 2,
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
