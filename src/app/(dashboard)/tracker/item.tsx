"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { items } from "@/db/schema";
import { useTransition } from "react";
import { updateState } from "@/db/actions/updateState";

type Props = {
  item: typeof items.$inferSelect;
  state?: number;
};

export const Item = ({ item, state }: Props) => {
  const [pending, startTransition] = useTransition();

  console.log("from item", state);

  const onClick = (itemId: number) => {
    // if (id === activeGameId) {
    //   return router.push("/tracker");
    // }

    startTransition(() => {
      updateState(itemId).catch(() => console.log("Something went wrong."));
    });
  };

  return (
    <div onClick={() => onClick(item.id)} className="h-20 w-20 cursor-pointer">
      <Image
        src={item.imageSrc}
        alt="oot"
        height={80}
        width={80}
        className={cn(state === 1 ? "opacity-100" : "opacity-30")}
      />
    </div>
  );
};
