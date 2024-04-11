import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
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
      onClick={() => onClick(id)}
      className={cn(
        "relative cursor-pointer",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <div className="min-[24px] flex w-full items-center justify-end">
        {active && (
          <div className="absolute right-0 top-0">
            <div className="flex items-center justify-center rounded-md bg-green-600 p-1.5">
              <Check className="h-4 w-4 stroke-[4] text-white" />
            </div>
          </div>
        )}
      </div>
      <Image src={imageSrc} alt="mascot" width={150} height={150} />
      <p className="text-center text-2xl font-bold">{title}</p>
    </div>
  );
};
