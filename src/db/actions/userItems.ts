"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import db from "@/db/drizzle";
import { getGamebyId, getUserProgress } from "../queries";
import { userProgress } from "../schema";
import { revalidatePath } from "next/cache";

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

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeGameId: gameId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.svg",
    });

    revalidatePath("/games");
    revalidatePath("/tracker");
    redirect("/tracker");
  }

  await db.insert(userProgress).values({
    userId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/mascot.svg",
    activeGameId: gameId,
  });

  revalidatePath("/games");
  revalidatePath("/tracker");
  redirect("/tracker");
};
