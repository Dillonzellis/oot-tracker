import { cache } from "react";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs";

import db from "./drizzle";
import { games, items, users, userItems, userGames } from "./schema";

export const getGames = cache(async () => {
  const data = await db.query.games.findMany();

  return data;
});

export const getGamebyId = cache(async (gameId: number) => {
  const data = await db.query.games.findFirst({
    where: eq(games.id, gameId),
  });

  return data;
});

export const getItemsByGame = cache(async (gameId: number) => {
  const data = await db.query.items.findMany({
    where: eq(items.game_id, gameId),
  });
  return data;
});

export const getUser = cache(async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  return data;
});

export const getUserGames = cache(async () => {
  const { userId } = auth();
  if (!userId) {
    return [];
  }
  const data = db.query.userGames.findMany({
    where: eq(userGames.user_id, userId),
  });
  return data;
});

export const getItemsByActiveGame = cache(async () => {
  const { userId } = auth();
  const user = await getUser();

  if (!userId || !user?.activeGameId) {
    return [];
  }

  const data = db.query.items.findMany({
    where: eq(items.game_id, user.activeGameId),
  });

  return data;
});

export const getItemsByUserWithState = cache(async () => {
  const { userId } = auth();

  if (!userId) {
    return [];
  }

  const data = db.query.userItems.findMany({
    where: eq(userItems.user_id, userId),
  });

  return data;
});

export const getItemMaxStateIndex = async (itemId: number) => {
  const data = await db
    .select({
      maxStateIndex: items.maxStateIndex,
    })
    .from(items)
    .where(eq(items.id, itemId))
    .execute();

  return data;
};

export const getCurrentState = async (itemId: number) => {
  const { userId } = auth();

  if (!userId) {
    return [];
  }

  const data = await db
    .select({ state: userItems.currentStateIndex })
    .from(userItems)
    .where(and(eq(userItems.user_id, userId), eq(userItems.item_id, itemId)))
    .execute();

  return data;
};
