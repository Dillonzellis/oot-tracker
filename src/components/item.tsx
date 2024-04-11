import { cn } from "@/lib/utils";
import Image from "next/image";
import { items } from "@/db/schema";

type Props = {
  item: typeof items.$inferSelect;
  state?: string;
};

export const Item = ({ item, state }: Props) => {
  return (
    <div className="h-20 w-20">
      <Image
        src={item.imageSrc}
        alt="oot"
        height={80}
        width={80}
        className={cn(state === "FOUND" ? "opacity-100" : "opacity-30")}
      />
    </div>
  );
};
