import MaxWidthWrapper from "@/components/max-width-wrapper";
import { GameList } from "./game-list";
import { getGames, getUserProgress } from "@/db/queries";
import { ReactNode } from "react";

const Heading = ({ children }: { children: ReactNode }) => {
  return <h1 className="py-12 text-center text-2xl font-bold">{children}</h1>;
};

export default async function GamesPage() {
  const gamesData = await getGames();
  const userProgressData = await getUserProgress();

  const [games, userProgress] = await Promise.all([
    gamesData,
    userProgressData,
  ]);

  return (
    <main className="">
      <MaxWidthWrapper>
        {userProgress ? (
          <Heading>
            Hello, {userProgress.userName} pick up where you left off? or start
            a new game?
          </Heading>
        ) : (
          <Heading>Pick a game</Heading>
        )}
        <GameList games={games} activeGameId={userProgress?.activeGameId} />
      </MaxWidthWrapper>
    </main>
  );
}
