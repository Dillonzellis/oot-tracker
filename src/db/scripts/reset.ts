import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Resetting database");

    await db.delete(schema.games);
    await db.delete(schema.items);
    await db.delete(schema.users);
    await db.delete(schema.userItems);
    await db.delete(schema.userGames);

    console.log("Reset finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to reset the database");
  }
};

main();
