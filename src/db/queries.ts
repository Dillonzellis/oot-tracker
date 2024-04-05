import { cache } from "react";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs";

import db from "./drizzle";
import { games, itemStates, items, userProgress } from "./schema";

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

export const getItemsByActiveGame = cache(async () => {
  const { userId } = auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeGameId) {
    return [];
  }

  const data = db.query.items.findMany({
    where: eq(items.gameId, userProgress.activeGameId),
  });

  return data;
});

// get by UserID and activegame id
export const getItemState = cache(async (user: any) => {
  const { userId } = auth();
  const userProgress = await getUserProgress();

  if (!userId) {
    return null;
  }

  const data = db.query.itemStates.findFirst({
    where: eq(itemStates.userId, userId),

    with: {
      item: true,
      game: true,
    },
  });

  return data;
});

export const getUserProgress = cache(async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeGame: true,
    },
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
