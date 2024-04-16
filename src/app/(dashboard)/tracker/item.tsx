"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { itemImages, items } from "@/db/schema";
import { useTransition } from "react";
import { updateState } from "@/db/actions/updateState";

type Props = {
  item: typeof items.$inferSelect;
  state: number;
  itemImages: { imageSrc: string }[];
};

export const Item = ({ item, state, itemImages }: Props) => {
  const [pending, startTransition] = useTransition();

  const onClick = (itemId: number) => {
    startTransition(() => {
      updateState(itemId).catch(() => console.log("Something went wrong."));
    });
  };

  const imageIndex = state > 0 ? (state - 1) % itemImages.length : 0;
  const currentImageSrc = itemImages[imageIndex].imageSrc;

  return (
    <div
      onClick={() => onClick(item.id)}
      className={cn(
        "h-20 w-20 cursor-pointer",
        pending && "pointer-events-none",
      )}
    >
      <Image
        src={currentImageSrc}
        alt={item.name}
        height={80}
        width={80}
        className={cn(state === 0 ? "opacity-30" : "opacity-100")}
        priority={true}
      />
    </div>
  );
};
