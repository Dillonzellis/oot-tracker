import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

type Props = {
  imgSrc: string;
  active: boolean;
};

export const Item = ({ imgSrc, active }: Props) => {
  return (
    <div className="h-20 w-20">
      <Image
        src={imgSrc}
        alt="oot"
        height={80}
        width={80}
        className={cn(active ? "opacity-100" : "opacity-30")}
      />
    </div>
  );
};
