"use server";

import db from "@/db/drizzle";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { userItems } from "../schema";
import { getCurrentState } from "../queries";

export const updateState = async (itemId: number) => {
  // const nextState = getNextState(currentState[0]?.state);

  const currentState = await getCurrentState(itemId);

  await db
    .update(userItems)
    .set({
      state: "FOUND",
    })
    .where(eq(userItems.item_id, itemId));

  revalidatePath("/tracker");
};
