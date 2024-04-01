import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.items);
    await db.delete(schema.itemStates);
    await db.delete(schema.userItems);

    await db.insert(schema.items).values([
      {
        itemId: 1,
        itemName: "deku-stick",
        imageSrc: "/deku-stick.png",
      },
      {
        itemId: 2,
        itemName: "fairy-ocarina",
        imageSrc: "/fairy-stick.png",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
