import MaxWidthWrapper from "@/components/max-width-wrapper";
import {
  getGamebyId,
  getItemsByActiveGame,
  getItemsByUserItems,
  getCurrentState,
  getUser,
  getItemImages,
} from "@/db/queries";
import { redirect } from "next/navigation";
import { Item } from "./item";

export default async function Home() {
  const user = await getUser();
  if (!user || !user.activeGameId) {
    redirect("/games");
  }

  const gameItemsData = await getItemsByActiveGame();
  const userItemsData = await getItemsByUserItems();
  const game = await getGamebyId(user.activeGameId);

  const [userItems, gameItems] = await Promise.all([
    userItemsData,
    gameItemsData,
  ]);

  // const currentState = await getCurrentState(userItems[0].item_id);

  const itemsWithState = await Promise.all(
    gameItems.map(async (gameItem) => {
      const state = await getCurrentState(gameItem.id);

      const itemImages = await getItemImages(gameItem.id);
      console.log("itemImages", itemImages);
      console.log("state", state);
      return { ...gameItem, state, itemImages }; // Merge state with gameItem properties
    }),
  );

  return user.activeGameId ? (
    <main className="">
      <MaxWidthWrapper>
        <h1 className="scroll-m-20 pt-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
          {game?.name}
        </h1>
        <div className="flex gap-x-4">
          {itemsWithState.map((item) => (
            <Item
              key={item.id}
              item={item}
              state={item.state}
              itemImages={item.itemImages}
            />
          ))}
        </div>
      </MaxWidthWrapper>
    </main>
  ) : null;
}
