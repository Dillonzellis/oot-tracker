import { cache } from "react";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs";

import db from "./drizzle";
import { userItems } from "./schema";

export const getItems = cache(async () => {
  const data = await db.query.items.findMany();
  return data;
});

// export const getUserItems = cache(async () => {
//   const { userId } = auth();
//
//   if (!userId) {
//     return null;
//   }
//
//   const data = await db.query.userItems.findFirst({
//     where: eq(userItems.userid, userId),
//   });
//
//   return data;
// });
