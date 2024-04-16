import MaxWidthWrapper from "@/components/max-width-wrapper";
import {
  getGamebyId,
  getItemsByActiveGame,
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
  const game = await getGamebyId(user.activeGameId);

  const [gameItems] = await Promise.all([gameItemsData]);

  const itemsWithState = await Promise.all(
    gameItems.map(async (gameItem) => {
      const state = await getCurrentState(gameItem.id);
      const itemImages = await getItemImages(gameItem.id);
      return { ...gameItem, state, itemImages };
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
