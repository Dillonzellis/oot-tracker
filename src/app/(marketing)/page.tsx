import MaxWidthWrapper from "@/components/max-width-wrapper";
import { GameList } from "./game-list";
import { getGames } from "@/db/queries";

export default async function MarketingHome() {
  const games = await getGames();

  return (
    <main className="">
      <MaxWidthWrapper>
        <h1 className="py-12 text-center text-2xl font-bold">Pick a game</h1>
        <GameList games={games} />
      </MaxWidthWrapper>
    </main>
  );
}
