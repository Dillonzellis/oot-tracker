"use client";

import { games } from "@/db/schema";
import Link from "next/link";
import { useTransition } from "react";
import { Card } from "./card";

type Props = {
  games: (typeof games.$inferSelect)[];
};

export const GameList = ({ games }: Props) => {
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    // if (id === activeCourseId) {
    //   return router.push("/learn");
    // }

    // startTransition(() => {
    //   upsertUserProgress(id).catch(() => console.log("Something went wrong."));
    // });
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
        />
        // <div>{game.gameName}</div>
      ))}
    </div>
  );
};
