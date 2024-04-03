import MaxWidthWrapper from "@/components/max-width-wrapper";
import { GameList } from "./game-list";
import { getGames, getUserProgress } from "@/db/queries";

export default async function MarketingHome() {
  const gamesData = await getGames();
  const userProgressData = await getUserProgress();

  const [games, userProgress] = await Promise.all([
    gamesData,
    userProgressData,
  ]);

  return (
    <main className="">
      <MaxWidthWrapper>
        <h1 className="py-12 text-center text-2xl font-bold">Pick a game</h1>
        <GameList games={games} activeGameId={userProgress?.activeGameId} />
      </MaxWidthWrapper>
    </main>
  );
}
