import { cache } from "react";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs";

import db from "./drizzle";
import { games, itemStates, items } from "./schema";

export const getGames = cache(async () => {
  const data = await db.query.games.findMany();

  return data;
});

export const getGamebyId = cache(async (gameId: number) => {
  const data = await db.query.games.findFirst({
    where: eq(games.gameId, gameId),
  });

  return data;
});

export const getItemsByGame = cache(async (gameId: number) => {
  const data = await db.query.items.findMany({
    where: eq(items.gameId, gameId),
  });
  return data;
});

// export const getItemsWithState = cache(async (userId: string) => {
//   const data = await db.query.items.findMany({
//     where: eq(items.gameId, itemId),
//     with: {
//       itemStates: {
//         where: eq(itemStates.type, "FOUND"),
//       },
//     },
//   });
//
//   return data;
// });

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
