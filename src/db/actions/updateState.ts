"use server";

import db from "@/db/drizzle";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { userItems } from "../schema";

export const updateState = async (itemId: number) => {
  await db
    .update(userItems)
    .set({
      state: "FOUND",
    })
    .where(eq(userItems.item_id, itemId));

  revalidatePath("/tracker");
};
