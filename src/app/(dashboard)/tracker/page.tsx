import { Item } from "@/components/item";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { getItemsByActiveGame, getUser } from "@/db/queries";
import { redirect } from "next/navigation";

export default async function Home() {
  const userData = await getUser();
  const gameItemsData = await getItemsByActiveGame();

  const [user, gameItems, itemState] = await Promise.all([
    userData,
    gameItemsData,
    // itemStatesData,
  ]);

  if (!user || !user.activeGameId) {
    redirect("/games");
  }

  return user.activeGameId ? (
    <main className="">
      <MaxWidthWrapper>
        <h1 className="scroll-m-20 pt-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
          {user.activeGameId}
        </h1>
        <div className="flex gap-x-4">
          {gameItems.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </div>
      </MaxWidthWrapper>
    </main>
  ) : null;
}
