import { Item } from "@/components/item";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import {
  getItemsByActiveGame,
  getItemsByUserWithState,
  getUser,
  getUserGames,
} from "@/db/queries";
import { redirect } from "next/navigation";

export default async function Home() {
  const userData = await getUser();
  const gameItemsData = await getItemsByActiveGame();
  const userItemsData = await getItemsByUserWithState();
  // const userGames = await getUserGames();

  const [user, userItems, gameItems] = await Promise.all([
    userData,
    userItemsData,
    gameItemsData,
  ]);

  if (!user || !user.activeGameId) {
    redirect("/games");
  }

  return user.activeGameId ? (
    <main className="">
      <MaxWidthWrapper>
        {/* {JSON.stringify(userGames)} */}
        {JSON.stringify(userItems.map((item) => item.id + item.state))}
        <h1 className="scroll-m-20 pt-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
          {user.activeGameId}
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
