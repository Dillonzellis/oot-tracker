import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "src/db/scripts/migrations",
    });

    console.log("migration successful");
  } catch (error) {
    console.error("migration failed", error);
    process.exit(1);
  }
};

main();
