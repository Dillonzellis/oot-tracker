import { cache } from "react";

import db from "./drizzle";

export const getItems = cache(async () => {
  const data = await db.query.items.findMany();

  return data;
});
