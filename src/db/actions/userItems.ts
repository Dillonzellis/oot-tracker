"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import db from "@/db/drizzle";
import { getGamebyId, getItemsByGame, getUser, getUserGames } from "../queries";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { users, userItems, userGames } from "../schema";

export const upsertUserActiveGame = async (gameId: number) => {
  const { userId } = auth();
  const clerkUser = await currentUser();
  const existingUser = await getUser();
  const game = await getGamebyId(gameId);
  const items = await getItemsByGame(gameId);
  const existingUserGames = await getUserGames();

  if (!userId || !clerkUser) {
    throw new Error("Unauthorized");
  }

  if (!game) {
    throw new Error("game not found");
  }

  if (existingUser) {
    await db
      .update(users)
      .set({
        userName: clerkUser.firstName || "User",
        userImageSrc: clerkUser.imageUrl || "/mascot.svg",
        activeGameId: gameId,
      })
      .where(eq(users.id, userId));

    if (!existingUserGames.find((game) => game.game_id === gameId)) {
      await db.insert(userGames).values({
        user_id: userId,
        game_id: gameId,
      });
      items.map(async (item) => {
        await db.insert(userItems).values({
          user_id: userId,
          item_id: item.id,
          state: "NOT_FOUND",
        });
      });
    }

    revalidatePath("/games");
    revalidatePath("/tracker");
    redirect("/tracker");
  }

  await db.insert(users).values({
    id: userId,
    userName: clerkUser.firstName || "User",
    userImageSrc: clerkUser.imageUrl || "/mascot.svg",
    activeGameId: gameId,
  });

  if (!existingUserGames.find((game) => game.game_id === gameId)) {
    await db.insert(userGames).values({
      user_id: userId,
      game_id: gameId,
    });
    items.map(async (item) => {
      await db.insert(userItems).values({
        user_id: userId,
        item_id: item.id,
        state: "NOT_FOUND",
      });
    });
  }

  revalidatePath("/games");
  revalidatePath("/tracker");
  redirect("/tracker");
};
