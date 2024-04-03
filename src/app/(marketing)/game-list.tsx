"use client";

import { games, userProgress } from "@/db/schema";
import Link from "next/link";
import { useTransition } from "react";
import { Card } from "./card";
import { upsertUserProgress } from "@/db/actions/userItems";

type Props = {
  games: (typeof games.$inferSelect)[];
  activeGameId?: typeof userProgress.$inferSelect.activeGameId;
};

export const GameList = ({ games, activeGameId }: Props) => {
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    // if (id === activeCourseId) {
    //   return router.push("/learn");
    // }

    startTransition(() => {
      upsertUserProgress(id).catch(() => console.log("Something went wrong."));
    });
  };

  return (
    <div className="flex justify-center gap-12">
      {games.map((game) => (
        <Card
          key={game.gameId}
          title={game.gameName}
          id={game.gameId}
          imageSrc={game.imageSrc}
          onClick={onClick}
          disabled={pending}
          active={game.gameId === activeGameId}
        />
      ))}
    </div>
  );
};
