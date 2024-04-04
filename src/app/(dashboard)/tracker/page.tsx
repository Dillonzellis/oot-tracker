import { Item } from "@/components/item";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { getItemsByActiveGame, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

export default async function Home() {
  const userProgressData = await getUserProgress();
  const gameItemsData = await getItemsByActiveGame();

  const [userProgress, gameItems] = await Promise.all([
    userProgressData,
    gameItemsData,
  ]);

  if (!userProgress || !userProgress.activeGameId) {
    redirect("/games");
  }

  return userProgress.activeGame ? (
    <main className="">
      <MaxWidthWrapper>
        <h1 className="scroll-m-20 pt-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
          {userProgress.activeGame.gameName}
        </h1>
        <div className="flex gap-x-4">
          {gameItems.map((item) => (
            <Item key={item.itemId} item={item} />
          ))}
        </div>
      </MaxWidthWrapper>
    </main>
  ) : null;
}
