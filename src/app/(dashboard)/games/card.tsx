import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  title: string;
  id: number;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
};

export const Card = ({
  title,
  id,
  imageSrc,
  onClick,
  disabled,
  active,
}: Props) => {
  return (
    <div
      className={cn(
        "cursor-pointer",
        disabled && "pointer-events-none opacity-50",
      )}
      onClick={() => onClick(id)}
    >
      {active && <h1 className="text-5xl text-white">Active</h1>}
      <Image src={imageSrc} alt="mascot" width={150} height={150} />
      <p className="text-center text-2xl font-bold">{title}</p>
    </div>
  );
};
