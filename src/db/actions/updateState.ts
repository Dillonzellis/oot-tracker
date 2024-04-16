"use server";

import db from "@/db/drizzle";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { userItems } from "../schema";
import { getCurrentState, getItemMaxStateIndex } from "../queries";

export const updateState = async (itemId: number) => {
  const currentState = await getCurrentState(itemId);
  const maxStateIndex = await getItemMaxStateIndex(itemId);

  console.log("Current state", currentState);
  console.log("Max state index", maxStateIndex);

  if (typeof currentState !== "number" || typeof maxStateIndex !== "number") {
    throw new Error("Invalid state or max state index; both must be numbers.");
  }

  if (currentState === undefined || maxStateIndex === undefined) {
    throw new Error("Item not found");
  }

  const nextState = (currentState + 1) % (maxStateIndex + 1);
  console.log("Next state", nextState);

  await db
    .update(userItems)
    .set({
      currentStateIndex: nextState,
    })
    .where(eq(userItems.item_id, itemId));

  revalidatePath("/tracker");
};
