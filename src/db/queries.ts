import { cache } from "react";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs";

import db from "./drizzle";
import { items, userItems } from "./schema";

export const getItems = cache(async (gameId: number) => {
  const data = await db.query.items.findMany({
    where: eq(items.gameId, gameId),
  });
  return data;
});

// export const getUserItems = cache(async () => {
//   const { userId } = auth();
//
//   if (!userId) {
//     return null;
//   }
//
//   const data = await db.query.userItems.findFirst({
//     where: eq(userItems.userid, userId),
//   });
//
//   return data;
// });
