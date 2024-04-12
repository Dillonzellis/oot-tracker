"use server";

import db from "@/db/drizzle";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { userItems, itemStateType } from "../schema";
import { getCurrentState } from "../queries";

export const updateState = async (itemId: number) => {
  const currentState = await getCurrentState(itemId);

  // if (!currentState) {
  //   throw new Error("Item not found");
  // }

  const getNextState = (currentState: any) => {
    const states = ["NOT_FOUND", "FOUND", "UPGRADED_1"];
    const currentIndex = states.indexOf(currentState);
    const nextIndex = (currentIndex + 1) % states.length;
    return states[nextIndex];
  };

  const nextState = getNextState(currentState?.state);

  await db
    .update(userItems)
    .set({
      state: nextState as any,
    })
    .where(eq(userItems.item_id, itemId));

  console.log("Updated state to", nextState);

  revalidatePath("/tracker");
};
