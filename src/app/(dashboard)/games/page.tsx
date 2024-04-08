import MaxWidthWrapper from "@/components/max-width-wrapper";
import { GameList } from "./game-list";
import { getGames, getUser } from "@/db/queries";
import { ReactNode } from "react";

const Heading = ({ children }: { children: ReactNode }) => {
  return <h1 className="py-12 text-center text-2xl font-bold">{children}</h1>;
};

export default async function GamesPage() {
  const gamesData = await getGames();
  const userData = await getUser();

  const [games, user] = await Promise.all([gamesData, userData]);

  return (
    <main className="">
      <MaxWidthWrapper>
        {user ? (
          <Heading>
            Hello, {user.userName} pick up where you left off? or start a new
            game?
          </Heading>
        ) : (
          <Heading>Pick a game</Heading>
        )}
        <GameList games={games} activeGameId={user?.activeGameId} />
      </MaxWidthWrapper>
    </main>
  );
}
