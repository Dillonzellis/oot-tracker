"use server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs";

import db from "@/db/drizzle";
import { POINTS_TO_REFILL } from "@/constants";
import {
  getCourseById,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";

export const upsertUserItems = async () => {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  // if (!course) {
  //   throw new Error("Course not found");
  // }
  //
  // if (!course.units.length || !course.units[0].lessons.length) {
  //   throw new Error("Course is empty");
  // }

  // const existingUserProgress = await getUserProgress();
  //
  // if (existingUserProgress) {
  //   await db.update(userProgress).set({
  //     activeCourseId: courseId,
  //     userName: user.firstName || "User",
  //     userImageSrc: user.imageUrl || "/mascot.svg",
  //   });
  //
  //   revalidatePath("/courses");
  //   revalidatePath("/learn");
  //   redirect("/learn");
  // }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/mascot.svg",
  });

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};
