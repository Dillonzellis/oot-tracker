"use server";

import { auth, currentUser } from "@clerk/nextjs";

import db from "@/db/drizzle";
import { getGamebyId } from "../queries";
import { userProgress } from "../schema";

export const upsertUserProgress = async (gameId: number) => {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const game = await getGamebyId(gameId);

  if (!game) {
    throw new Error("game not found");
  }

  await db.insert(userProgress).values({
    userId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/mascot.svg",
    activeGameId: gameId,
  });
};
