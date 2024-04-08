"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import db from "@/db/drizzle";
import { getGamebyId, getUser } from "../queries";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { user } from "../schema";

export const upsertUserProgress = async (gameId: number) => {
  const { userId } = auth();
  const clerkUser = await currentUser();

  if (!userId || !clerkUser) {
    throw new Error("Unauthorized");
  }

  const game = await getGamebyId(gameId);

  if (!game) {
    throw new Error("game not found");
  }

  const existingUser = await getUser();

  if (existingUser) {
    await db
      .update(user)
      .set({
        userName: clerkUser.firstName || "User",
        userImageSrc: clerkUser.imageUrl || "/mascot.svg",
        activeGameId: gameId,
      })
      .where(eq(user.id, userId));

    revalidatePath("/games");
    revalidatePath("/tracker");
    redirect("/tracker");
  }

  await db.insert(user).values({
    id: userId,
    userName: clerkUser.firstName || "User",
    userImageSrc: clerkUser.imageUrl || "/mascot.svg",
    activeGameId: gameId,
  });

  revalidatePath("/games");
  revalidatePath("/tracker");
  redirect("/tracker");
};
