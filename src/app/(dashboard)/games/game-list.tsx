"use client";

import { games, users } from "@/db/schema";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "./card";
import { upsertUserActiveGame } from "@/db/actions/userItems";

type Props = {
  games: (typeof games.$inferSelect)[];
  activeGameId?: (typeof users.$inferSelect)["activeGameId"];
};

export const GameList = ({ games, activeGameId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeGameId) {
      return router.push("/tracker");
    }

    startTransition(() => {
      upsertUserActiveGame(id).catch(() =>
        console.log("Something went wrong."),
      );
    });
  };

  return (
    <div className="flex justify-center gap-12">
      {games.map((game) => (
        <Card
          key={game.id}
          title={game.name}
          id={game.id}
          imageSrc={game.imageSrc}
          onClick={onClick}
          disabled={pending}
          active={game.id === activeGameId}
        />
      ))}
    </div>
  );
};
