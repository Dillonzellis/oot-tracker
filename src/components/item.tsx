import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

type Props = {
  imgSrc: StaticImageData;
};

export const Item = ({ imgSrc }: Props) => {
  return (
    <div className="h-20 w-20">
      <Image src={imgSrc} alt="oot" className={cn("opacity-20")} />
    </div>
  );
};
