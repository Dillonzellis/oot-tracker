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
    // if (id === activeGameId) {
    //   return router.push("/tracker");
    // }

    startTransition(() => {
      updateState(itemId).catch(() => console.log("Something went wrong."));
    });
  };

  // Determine the image index using state; cycle through images
  const imageIndex = state > 0 ? (state - 1) % itemImages.length : 0;
  const currentImageSrc = itemImages[imageIndex].imageSrc;

  // Set image opacity: 30% if state is 0, otherwise 100%
  const imageOpacity = state === 0 ? "opacity-30" : "opacity-100";

  return (
    <div onClick={() => onClick(item.id)} className="h-20 w-20 cursor-pointer">
      <Image
        src={currentImageSrc}
        alt="oot"
        height={80}
        width={80}
        className={imageOpacity}
        priority
      />
    </div>
  );
};
