import MaxWidthWrapper from "@/components/max-width-wrapper";
import {
  getGamebyId,
  getItemsByActiveGame,
  getItemsByUserWithState,
  getUser,
} from "@/db/queries";
import { redirect } from "next/navigation";
import { Item } from "./item";

export default async function Home() {
  const user = await getUser();
  if (!user || !user.activeGameId) {
    redirect("/games");
  }

  const gameItemsData = await getItemsByActiveGame();
  const userItemsData = await getItemsByUserWithState();
  const game = await getGamebyId(user.activeGameId);

  const [userItems, gameItems] = await Promise.all([
    userItemsData,
    gameItemsData,
  ]);

  return user.activeGameId ? (
    <main className="">
      <MaxWidthWrapper>
        <h1 className="scroll-m-20 pt-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
          {game?.name}
        </h1>
        <div className="flex gap-x-4">
          {gameItems.map((gameItem) => (
            <Item
              key={gameItem.id}
              item={gameItem}
              state={
                userItems.find((userItem) => userItem.item_id === gameItem.id)
                  ?.state
              }
            />
          ))}
        </div>
      </MaxWidthWrapper>
    </main>
  ) : null;
}
